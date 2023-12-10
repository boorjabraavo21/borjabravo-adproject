import { BehaviorSubject, Observable, lastValueFrom, map } from 'rxjs';
import { UserCredentials } from '../../../interfaces/user-credentials';
import { UserRegisterInfo } from '../../../interfaces/user-register-info';
import { JwtService } from '../../jwt.service';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { StrapiArrayResponse, StrapiExtendedUser, StrapiLoginPayload, StrapiLoginResponse, StrapiRegisterPayload, StrapiRegisterResponse, StrapiResponse, StrapiUser } from '../../../interfaces/strapi';
import { User } from '../../../interfaces/user';


export class AuthStrapiService extends AuthService{

  constructor(
    private jwtSvc:JwtService,
    private apiSvc:ApiService
  ) { 
    super();
    this.jwtSvc.loadToken().subscribe(token=>{
      if(token){
        this.me().subscribe(user=>{
          this._logged.next(true);
          this._user.next(user);
        })
      }else{
        this._logged.next(false);
        this._user.next(null);
      }
    });
  }

 
  public login(credentials:UserCredentials):Observable<User>{
    return new Observable<User>(obs=>{
      const _credentials:StrapiLoginPayload = {
        identifier:credentials.username,
        password:credentials.password
      };
      this.apiSvc.post("/auth/local", _credentials).subscribe({
        next:async (data:StrapiLoginResponse)=>{
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          try {
            const user = await lastValueFrom(this.me());
            this._user.next(user);
            this._logged.next(true);
            obs.next(user);
            obs.complete();
          } catch (error) {
            obs.error(error);
          }
        },
        error:err=>{
          obs.error(err);
        }
      });
    });
  }

  logout():Observable<void>{
    return this.jwtSvc.destroyToken().pipe(map(_=>{
      this._logged.next(false);
      return;
    }));
  }

  register(info:UserRegisterInfo):Observable<User>{
    return new Observable<User>(obs=>{
      const _info:StrapiRegisterPayload = {
        email:info.email,
        username:info.nickname,
        password:info.password
      }
      this.apiSvc.post("/auth/local/register", _info).subscribe({
        next:async (data:StrapiRegisterResponse)=>{
          
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          const _extended_user:StrapiExtendedUser= {
            name:info.name,
            surname:info.surname,
            user_id:data.user.id,
            nickname:info.nickname
          }
          try {
            await lastValueFrom(this.apiSvc.post("/extend-users", {data:_extended_user}));
            const user = await lastValueFrom(this.me());
            this._user.next(user);
            this._logged.next(true);
            obs.next(user);
            obs.complete();  
          } catch (error) {
            obs.error(error);
          }
          
        },
        error:err=>{
          obs.error(err);
        }
      });
    });
  }

  public me():Observable<User>{
    return new Observable<User>(obs=>{
      this.apiSvc.get(`/users/me`).subscribe({
        next:async (user:StrapiUser)=>{
          console.log(user.id)
          let extended_user:StrapiArrayResponse<StrapiExtendedUser> = 
          await lastValueFrom(this.apiSvc.get(`/extend-users?filters[id]=${user.id}`));
          console.log(extended_user)
          let ret:User = {
            id:user.id,
            name:extended_user.data[0].attributes.name,
            surname:extended_user.data[0].attributes.surname,
            nickname:user.username
          }
          obs.next(ret);
          obs.complete();
        },
        error: err=>{
          obs.error(err);
        }
      });
    })
  }
}
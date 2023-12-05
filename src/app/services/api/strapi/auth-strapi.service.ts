import { Injectable } from '@angular/core';
import { JwtService } from '../../jwt.service';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { UserCredentials } from 'src/app/interfaces/user-credentials';
import { Observable, lastValueFrom, map } from 'rxjs';
import { StrapiArrayResponse, StrapiExtendedUser, StrapiLoginPayload, StrapiLoginResponse, StrapiRegisterPayload, StrapiRegisterResponse, StrapiUser } from 'src/app/interfaces/strapi';
import { UserRegisterInfo } from 'src/app/interfaces/user-register-info';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthStrapiService extends AuthService {

  constructor(
    private jwtSvc:JwtService,
    private apiSvc:ApiService
  ) { 
    super();
    this.init();
  }

  private init(){
    this.jwtSvc.loadToken().subscribe(token => {
      if(token) {
        this.me().subscribe(user => {
          this._logged.next(true)
          this._user.next(user)
        })
      } else {
        this._logged.next(false)
        this._user.next(null)
      }
    });
  }

  public login(credentials:UserCredentials):Observable<void>{
    return new Observable<void>(obs=>{
      const _credentials:StrapiLoginPayload = {
        identifier:credentials.username,
        password:credentials.password
      };
      this.apiSvc.post("/auth/local", _credentials).subscribe({
        next:async (data:StrapiLoginResponse)=>{
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          this._logged.next(data && data.jwt!='');
          obs.next();
          obs.complete();
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

  register(info:UserRegisterInfo):Observable<void>{
    return new Observable<void>(obs=>{
      const _info:StrapiRegisterPayload = {
        email:info.email,
        username:info.username,
        password:info.password
      }
      this.apiSvc.post("/auth/local/register", info).subscribe({
        next:async (data:StrapiRegisterResponse)=>{
          let connected = data && data.jwt!='';
          this._logged.next(connected);
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          const _extended_user:StrapiExtendedUser= {
            name:info.name,
            surname:info.surname,
            user_id:data.user.id
          }
          await lastValueFrom(this.apiSvc.post("/extend_user", _extended_user)).catch;
          obs.next();
          obs.complete();
        },
        error:err=>{
          obs.error(err);
        }
      });
    });
  }

  public me():Observable<User>{
    return new Observable<User>(obs=>{
      this.apiSvc.get('/users/me').subscribe({
        next:async (user:StrapiUser)=>{
          let extended_user:StrapiArrayResponse<StrapiExtendedUser> = await lastValueFrom(this.apiSvc.get(`/extend-users?filters[id]=${user.id}`));
          let ret:User = {
            id:user.id,
            name:extended_user.data[0].attributes.name,
            surname:extended_user.data[0].attributes.surname,
          }
          obs.next(ret);
          obs.complete();
        },
        error: err=>{
          obs.error(err);
        }
      });
    });
    
  }
}

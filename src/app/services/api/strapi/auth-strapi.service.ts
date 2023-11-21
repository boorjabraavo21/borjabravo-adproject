import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, lastValueFrom, map, tap } from 'rxjs';
import { JwtService } from '../../jwt.service';
import { ApiService } from '../api.service';
import { UserCredentials } from 'src/app/interfaces/user-credentials';
import { StrapiExtendedUser, StrapiLoginPayload, StrapiLoginResponse, StrapiRegisterPayload, StrapiRegisterResponse, StrapiUser } from 'src/app/interfaces/strapi';
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
    this.init()
  }

  private init() {
    this.jwtSvc.loadToken().subscribe(logged => {
      this._logged.next(logged!="")
    })
  }

  public override login(credentials: UserCredentials): Observable<any> {
    return new Observable<void>(obs => {
      const _credentians:StrapiLoginPayload = {
        identifier:credentials.username,
        password:credentials.password
      }
      this.apiSvc.post("/auth/local",_credentians).subscribe({
        next: async (data:StrapiLoginResponse) => {
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt))
          let connected = data && data.jwt!=""
          this._logged.next(connected)
          obs.next()
          obs.complete()
        },
        error: err => {
          obs.error(err)
        }
      })
    })
  }

  public override register(info: UserRegisterInfo): Observable<any> {
    return new Observable<void>(obs => {
      const _info:StrapiRegisterPayload = {
        username:info.username,
        email:info.email,
        password:info.password
      }
      this.apiSvc.post("/auth/local/register",info).subscribe({
        next: async (data:StrapiRegisterResponse) => {
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt))
          let connected = data && data.jwt != ""
          this._logged.next(connected)
          const _extendedUser:StrapiExtendedUser = {
            name:info.name,
            surname:info.surname,
            user_id:data.user.id
          }
          await lastValueFrom(this.apiSvc.post("/extend-user",_extendedUser))
          obs.next()
          obs.complete()
        },
        error: err => {
          obs.error(err)
        }
      })
    })
  }
  public override logout(): Observable<void> {
    return this.jwtSvc.destroyToken().pipe(
      map(_=>{
        this._logged.next(false)
        return}))
  }
  public override me(): Observable<any> {
    return new Observable<User>(obs => {
      this.apiSvc.get('/users/me').subscribe({
        next: async (user:StrapiUser) => {
          let extended_user = await lastValueFrom(this.apiSvc.get(`/extend-users?filters[user_id]=${user.id}`))
          let ret:User = {
            id:extended_user.id,
            name:extended_user.name,
            surname:extended_user.surname,
            picture:extended_user.picture,
          }
          obs.next(ret)
          obs.complete()
        },
        error: err =>{
          obs.error(err)
        }
      })
    })
  }
}

import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';

export type JwtToken = string

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  token = ""

  constructor() { }

  loadToken():Observable<JwtToken> {
    return new Observable<JwtToken>(obs => {
      Preferences.get({key:'jwtToken'}).then((ret:any) => {
        if(ret['value']) {
          this.token = JSON.parse(ret.value)
          if(this.token == '' && this.token == null) {
            obs.error('No token')
          } else {
            obs.next(this.token)
            obs.complete()
          }
        } else {
          obs.error('No token')
        }
      }).catch((err:any) => obs.error(err))
    })
  }

  getToken(): JwtToken {
    return this.token
  }

  saveToken(token:JwtToken):Observable<JwtToken> {
    return new Observable<JwtToken>(obs => {
      Preferences.set({
        key: 'jwtToken',
        value: JSON.stringify(token)
      }).then((_: any)=>{
        this.token = token
        obs.next(this.token)
        obs.complete()
      }).catch((err:any) => obs.error(err))
    })
  }

  destroyToken():Observable<JwtToken>{
    this.token = ""
    return this.saveToken(this.token)
  }
}

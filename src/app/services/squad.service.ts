import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Squad } from '../interfaces/squad';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SquadService {

  private _squads = new BehaviorSubject<Squad[]>([])
  public squads$ = this._squads.asObservable()

  constructor(
    private http:HttpClient
  ) { }

  addSquad(squad:Squad):Observable<Squad> {
    var _squad:any = {
      name:squad.name,
      badge:squad.badge,
      lineUp:squad.lineUp,
      players:squad.players
    }
    return this.http.post<Squad>(environment.jsonUrl+"/squads/",_squad).pipe(tap(_=>{
      this.getAll().subscribe()
    }))
  }

  getAll():Observable<Squad[]> {
    return this.http.get<Squad[]>(environment.jsonUrl+"/squads/").pipe(tap((squads:any[]) => {
      this._squads.next(squads)
    }))
  }
}

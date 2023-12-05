import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PaginatedSquads, Squad } from '../interfaces/squad';
import { HttpClient } from '@angular/common/http';
import { DataService } from './api/data.service';

@Injectable({
  providedIn: 'root'
})
export class SquadService {

  private _squads = new BehaviorSubject<PaginatedSquads>({data:[], pagination:{page:0, pageCount: 0, pageSize: 0, total: 0}})
  public squads$ = this._squads.asObservable()

  constructor(
    private http:HttpClient,
    private dataSvc:DataService
  ) { }

  addSquad(squad:Squad):Observable<Squad> {
    delete squad.id
    return this.dataSvc.post<Squad>("squads",squad).pipe(tap(_=>{
      this.getAll().subscribe()
    }))
  }

  getAll():Observable<PaginatedSquads> {
    return this.dataSvc.get<PaginatedSquads>("squads").pipe(map(response => {
      return {
        data:response.data.map(squad => {
          return {
            id:squad.id,
            name:squad.name,
            lineUp:squad.lineUp,
            players:squad.players
          }
        }),
        pagination:response.pagination
      }
    }), tap(squads =>{
      this._squads.next(squads)
    }))
  }

  query(q:string):Observable<PaginatedSquads> {
    return this.dataSvc.query<any>("squads?=q"+q, {}).pipe(map(response => {
      return {
        data:response.data.map(squad => {
          return {
            id:squad.id,
            name:squad.name,
            lineUp:squad.lineUp,
            players:squad.players
          }
        }),
        pagination:response.pagination
      }
    }))
    // return this.http.get<Player[]>(environment.jsonUrl+"/players?=q"+q)
  }

  getSquad(id:number):Observable<Squad> {
    return this.dataSvc.get<Squad>(`squads/${id}`).pipe(map(squad => {
      return {
        id:squad.id,
        name:squad.name,
        lineUp:squad.lineUp,
        players:squad.players
      }
    }))
  }

  updateSquad(squad:Squad):Observable<Squad> {
    return this.dataSvc.put<Squad>(`squads/${squad.id}`,squad).pipe(map(squad => {
      return {
        id:squad.id,
        name:squad.name,
        lineUp:squad.lineUp,
        players:squad.players
      }
    }))
  }

  deleteSquad(squad:Squad):Observable<Squad> {
    return this.dataSvc.delete<Squad>(`squads/${squad.id}`).pipe(tap())
  }
}

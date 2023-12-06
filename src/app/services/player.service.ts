import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PaginatedPlayers, Player } from '../interfaces/player';
import { DataService } from './api/data.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _players = new BehaviorSubject<PaginatedPlayers>({data:[], pagination:{page:0, pageCount:0, pageSize:0, total:0}})
  public players$ = this._players.asObservable()

  constructor(
    private dataService:DataService
  ) { }

  getAll():Observable<PaginatedPlayers> {
    return this.dataService.query<any>("players?sort=id", {}).pipe(map(response => {
      return {
        data:response.data.map(player => {
          return {
            id:player.id,
            name:player.name,
            position:player.position,
            nation:player.nation,
            age:player.age,
            rating:player.rating,
            team:player.team,
            picture:player.picture
          }
        }),
        pagination:response.pagination
      }
    }), tap(players => {
      this._players.next(players)
    }))
  }

  getPlayer(id:number):Observable<Player> {
    return this.dataService.get<any>(`players/${id}`).pipe(map(response => {
      return {
        id:response.id,
        name:response.name,
        position:response.position,
        nation:response.nation,
        age:response.age,
        rating:response.rating,
        team:response.team,
        picture:response.picture
      }
    }))
  }

  query(q:string):Observable<PaginatedPlayers> {
    return this.dataService.query<any>("players?sort=id", {}).pipe(map(response => {
      return {
        data:response.data.map(player => {
          return {
            id:player.id,
            name:player.name,
            position:player.position,
            nation:player.nation,
            age:player.age,
            rating:player.rating,
            team:player.team,
            picture:player.picture
          }
        }),
        pagination:response.pagination
      }
    }))
  }

  addPlayer(player:Player):Observable<Player> {
    delete player.id
    if(player.picture=="")
      player.picture = null;
    player.team = "Created"
    return this.dataService.post<Player>("players", player).pipe(tap(_=>{
      this.getAll().subscribe()
    }));
  }

  updatePlayer(player:Player):Observable<Player> {
    return this.dataService.put<any>(`players/${player.id}`,player).pipe(map(response => {
      return {
        id:response.id,
        name:response.name,
        position:response.position,
        nation:response.nation,
        age:response.age,
        rating:response.rating,
        team:response.team,
        picture:response.picture
      }
    }))
  }

  deletePlayer(player:Player):Observable<Player> {
    return this.dataService.delete<any>(`players/${player.id}`).pipe(tap())
  }
}

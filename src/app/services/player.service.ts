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
    return this.dataService.query<any>("players?populate=picture&sort=id", {}).pipe(map(response => {
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
            matches:player.matches,
            numbers:player.numbers,
            assists:player.assists,
            picture:player.picture?.data?{
              id: player.picture.data.id,
              url_large: player.picture.data.attributes.formats.large?.url,
              url_small: player.picture.data.attributes.formats.small?.url,
              url_medium:player.picture.data.attributes.formats.medium?.url,
              url_thumbnail:player.picture.data.attributes.formats.thumbnail?.url,
            }:null
          }
        }),
        pagination:response.pagination
      }
    }), tap(players => {
      this._players.next(players)
    }))
  }

  getPlayer(id:number):Observable<Player> {
    return this.dataService.get<any>(`players/${id}?populate=picture`).pipe(map(response => {
      return {
        id:response.id,
        name:response.name,
        position:response.position,
        nation:response.nation,
        age:response.age,
        rating:response.rating,
        team:response.team,
        matches:response.matches,
        numbers:response.numbers,
        assists:response.assists,
        picture:response.picture?.data?{
          id: response.picture.data.id,
          url_large: response.picture.data.attributes.formats.large?.url,
          url_small: response.picture.data.attributes.formats.small?.url,
          url_medium:response.picture.data.attributes.formats.medium?.url,
          url_thumbnail:response.picture.data.attributes.formats.thumbnail?.url,
        }:null
      }
    }))
  }

  query(q:string):Observable<PaginatedPlayers> {
    return this.dataService.query<any>("players?populate=picture&sort=id", {}).pipe(map(response => {
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
            matches:player.matches,
            numbers:player.numbers,
            assists:player.assists,
            picture:player.picture?.data?{
              id: player.picture.data.id,
              url_large: player.picture.data.attributes.formats.large?.url,
              url_small: player.picture.data.attributes.formats.small?.url,
              url_medium:player.picture.data.attributes.formats.medium?.url,
              url_thumbnail:player.picture.data.attributes.formats.thumbnail?.url,
            }:null
          }
        }),
        pagination:response.pagination
      }
    }))
  }

  addPlayer(player:Player):Observable<Player> {
    delete player.id
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
        matches:response.matches,
        numbers:response.numbers,
        assists:response.assists,
        picture:response.picture?.data?{
          id: response.picture.data.id,
          url_large: response.picture.data.attributes.formats.large?.url,
          url_small: response.picture.data.attributes.formats.small?.url,
          url_medium:response.picture.data.attributes.formats.medium?.url,
          url_thumbnail:response.picture.data.attributes.formats.thumbnail?.url,
        }:null
      }
    }))
  }

  deletePlayer(player:Player):Observable<Player> {
    return this.dataService.delete<any>(`players/${player.id}`).pipe(tap())
  }
}

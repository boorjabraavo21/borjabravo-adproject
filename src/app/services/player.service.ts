import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Player } from '../interfaces/player';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from './api/data.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _players = new BehaviorSubject<Player[]>([]);
  public players$ = this._players.asObservable()

  constructor(
    private http:HttpClient,
    private dataService:DataService
  ) { }

  getAll():Observable<Player[]> {
    
    return this.http.get<Player[]>(environment.jsonUrl+"/players").pipe(tap((players:any[])=>{
      this._players.next(players)
    }))
    /* return new Observable(obs => {
      var players:Player[] = [
        {id:1, name:"Vinicius Jr", age:23, rating:89, position:"LW", nation:"Brasil", squad:"Real Madrid", picture:"../assets/vinicius.png"},
        {id:2, name:"Pedri", age:20, rating:86, position:"CM", nation:"Spain", squad:"Barcelona", picture:"../assets/pedri.png"},
        {id:3, name:"Griezmann", age:32, rating:88, position:"ST", nation:"France", squad:"Atlético de Madrid", picture:"../assets/griezmann.png"},
        {id:4, name:"Take Kubo", age:22, rating:80, position:"RW", nation:"Japan", squad:"Real Sociedad", picture:"../assets/kubo.png"},
      ]
      this._players.next(players)
    })*/ 
  }

  getPlayer(id:number):Observable<Player> {
    /* return this.dataService.get<any>(`players/${id}`).pipe(map(response => {
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
    })) */

    return this.http.get<Player>(environment.jsonUrl+"/players/"+id)
    /*return new Observable(obs => {
      var player = this._players.value.find(p => p.id == id)
      if(player)
        obs.next(player)
      else
        obs.error("No hay jugador")
      obs.complete()
    })*/
  }

  query(q:string):Observable<Player[]> {
    // return this.dataService.get<Player[]>(environment.apiUrl+"/players?=q"+q)
    return this.http.get<Player[]>(environment.jsonUrl+"/players?=q"+q)
  }

  addPlayer(player:Player):Observable<Player> {
    var _player:any = {
      name:player.name,
      position:player.position,
      age:player.age,
      nation:player.nation,
      rating:player.rating,
      picture:"",
      team:"Created"
    }
    /* return this.dataService.post<Player>("players", _player).pipe(tap(_=>{
      this.getAll().subscribe()
    })) */
    
    return this.http.post<Player>(environment.jsonUrl+"/players",_player).pipe(tap(_=>{
      this.getAll().subscribe()
    }))
  }

  updatePlayer(player:Player):Observable<Player> {
    /* return this.dataService.put<any>(`players/${player.id}`,player).pipe(map(response => {
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
    })) */
   
    return new Observable (obs => {
      this.http.patch<Player>(environment.jsonUrl+`/players/${player.id}`,player).subscribe(_=>{
        this.getPlayer(player.id).subscribe(_player => {
          obs.next(_player)
        })
      })
    })
  }

  deletePlayer(player:Player):Observable<Player> {
    /* return this.dataService.delete<any>(`players/${player.id}`).pipe(map(response => {
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
    })) */
    return new Observable (obs => {
      this.http.delete<Player>(environment.jsonUrl+`/players/${player.id}`).subscribe(_=>{
        this.getAll().subscribe(_=> {
          obs.next(player)
        })
      })
    })
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Player } from '../interfaces/player';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _players = new BehaviorSubject<Player[]>([]);
  public players$ = this._players.asObservable()

  constructor(
    private http:HttpClient
  ) { }

  getAll():Observable<Player[]> {
    return this.http.get<Player[]>(environment.jsonUrl+"/players").pipe(tap((players:any[])=>{
      this._players.next(players)
    }))
    /*return new Observable(obs => {
      var players:Player[] = [
        {id:1, name:"Vinicius Jr", age:23, rating:89, position:"LW", nation:"Brasil", team:"Real Madrid", picture:"../assets/vinicius.png"},
        {id:2, name:"Pedri", age:20, rating:86, position:"CM", nation:"Spain", team:"Barcelona", picture:"../assets/pedri.png"},
        {id:3, name:"Griezmann", age:32, rating:88, position:"ST", nation:"France", team:"Atlético de Madrid", picture:"../assets/griezmann.png"},
        {id:4, name:"Take Kubo", age:22, rating:80, position:"RW", nation:"Japan", team:"Real Sociedad", picture:"../assets/kubo.png"},
      ]
      this._players.next(players)
    })*/
  }

  getPlayer(id:number):Observable<Player> {
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
    return this.http.get<Player[]>(environment.jsonUrl+"/players?=q"+q)
  }
}

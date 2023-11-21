import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Pagination } from 'src/app/interfaces/data';
import { PaginatedPlayers, Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';


@Component({
  selector: 'app-player-searcher',
  templateUrl: './player-searcher.component.html',
  styleUrls: ['./player-searcher.component.scss'],
})
export class PlayerSearcherComponent  implements OnInit {

  playerSelected: Player | undefined
  private _players = new BehaviorSubject<Player[]>([])
  public players$ = this._players.asObservable()
  private _pagination = new BehaviorSubject<Pagination>({page:0, pageCount: 0, pageSize: 0, total:0})
  public pagination$ = this._pagination.asObservable()
  propagateChange = (obj:any) => {}
  hideList:boolean = true

  constructor(
    public plySvc:PlayerService,
    private router:Router
  ) { }

  async onLoadPlayers(page:number = 0, refresh:any = null) {
    this.plySvc.query("").subscribe(response => {
      this._players.next(response.data)
      this._pagination.next(response.pagination)

      if(refresh)
        refresh.complete()
    })
    this.hideList = false
  }

  private async selectPlayer(id:number | undefined, propagate = false) {
    if(id)
      this.playerSelected = await lastValueFrom(this.plySvc.getPlayer(id))
    else
      this.playerSelected = undefined
    if (propagate && this.playerSelected)
      this.propagateChange(this.playerSelected.id)
  }

  ngOnInit() {}

  private async filter(value:string){
    const query = value;
    const players = await lastValueFrom(this.plySvc.query(query))
    this._players.subscribe(_players => {
      _players = players.data.filter(u=>u.name.toLowerCase().includes(query.toLowerCase()))
    }) 
    this._pagination.subscribe(_pagination => {
      _pagination = players.pagination
    })
    //this.players = players.filter(u=>u.name.toLowerCase().includes(query.toLowerCase()));
  }

  onFilter(evt:any){
    this.filter(evt.detail.value);
  }

  onPlayerClicked(player:Player){
    this.selectPlayer(player.id, true);
    this.router.navigate(['/player-info',player.id])
    this.hideList = true
  }

  onCancel() {
    this.hideList = true
  }
}
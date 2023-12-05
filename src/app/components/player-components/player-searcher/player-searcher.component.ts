<<<<<<< Updated upstream:src/app/components/player-searcher/player-searcher.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
=======
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Pagination } from 'src/app/interfaces/data';
>>>>>>> Stashed changes:src/app/components/player-components/player-searcher/player-searcher.component.ts
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';


@Component({
  selector: 'app-player-searcher',
  templateUrl: './player-searcher.component.html',
  styleUrls: ['./player-searcher.component.scss'],
})
export class PlayerSearcherComponent  implements OnInit {

<<<<<<< Updated upstream:src/app/components/player-searcher/player-searcher.component.ts
  playerSelected: Player | undefined
  players: Player[] = []
  propagateChange = (obj:any) => {}
=======
  private _players = new BehaviorSubject<Player[]>([])
  public players$ = this._players.asObservable()
  private _pagination = new BehaviorSubject<Pagination>({page:0, pageCount: 0, pageSize: 0, total:0})
  public pagination$ = this._pagination.asObservable()
  @Input() player:Player | null = null
  @Output() onPlayerClicked = new EventEmitter()
>>>>>>> Stashed changes:src/app/components/player-components/player-searcher/player-searcher.component.ts
  hideList:boolean = true

  constructor(
    public plySvc:PlayerService,
    private popover:PopoverController
  ) { }

  async onLoadPlayers() {
    this.players = await lastValueFrom(this.plySvc.getAll())
    this.hideList = false
  }

  ngOnInit() {}

  private async filter(value:string){
    const query = value;
    const players = await lastValueFrom(this.plySvc.query(query))
<<<<<<< Updated upstream:src/app/components/player-searcher/player-searcher.component.ts
    this.players = players.filter(u=>u.name.toLowerCase().includes(query.toLowerCase()));
=======
    this._players.subscribe(_players => {
      _players = players.data.filter(u=>u.name.toLowerCase().includes(query.toLowerCase()))
    }) 
    this._pagination.subscribe(_pagination => {
      _pagination = players.pagination
    })
>>>>>>> Stashed changes:src/app/components/player-components/player-searcher/player-searcher.component.ts
  }

  onFilter(evt:any){
    this.filter(evt.detail.value);
  }

  onPlayerClick(player:Player){
    this.onPlayerClicked.emit(player)
    this.popover.dismiss(player,"ok")
    this.hideList = true
  }

  onCancel() {
    this.hideList = true
  }

  onPlayerDeselect() {
    this.popover.dismiss(null,"ok")
    this.hideList = true
  }
}
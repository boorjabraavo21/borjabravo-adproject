import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';


@Component({
  selector: 'app-player-searcher',
  templateUrl: './player-searcher.component.html',
  styleUrls: ['./player-searcher.component.scss'],
})
export class PlayerSearcherComponent  implements OnInit {

  playerSelected: Player | undefined
  players: Player[] = []
  propagateChange = (obj:any) => {}
  hideList:boolean = true

  constructor(
    public plySvc:PlayerService,
    private router:Router
  ) { }

  async onLoadPlayers() {
    this.players = await lastValueFrom(this.plySvc.getAll())
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
    this.players = players.filter(u=>u.name.toLowerCase().includes(query.toLowerCase()));
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
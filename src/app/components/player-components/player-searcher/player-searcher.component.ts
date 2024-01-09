import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController, ToastController, ToastOptions } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Pagination } from 'src/app/interfaces/data';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';


@Component({
  selector: 'app-player-searcher',
  templateUrl: './player-searcher.component.html',
  styleUrls: ['./player-searcher.component.scss'],
})
export class PlayerSearcherComponent  implements OnInit {

  players:Player[] = []
  pagination:Pagination = ({page:0, pageCount: 0, pageSize: 0, total:0})
  @Input() playersSelected:Player[] = []
  @Input() originalPlayers:boolean = false
  @Input() player:Player | null = null
  @Output() onPlayerClicked = new EventEmitter()
  showList = false
  constructor(
    public plySvc:PlayerService,
    private popover:PopoverController,
    private toast:ToastController
  ) {}

  ngOnInit() {}

  async onLoadPlayers(){
    const _players = await lastValueFrom(this.plySvc.query(""))
    this.players = _players.data
    this.pagination = _players.pagination
    this.showList = true
  }

  onFilter(evt:any) {
    this.filter(evt.target.value.toLowerCase())
  }

  private filter(value:string) {
    const query = value
    const _players = [...this.players]
    this.players = _players.filter(p => p.name.toLowerCase().includes(query))
  }

  onPlayerClick(player:Player){
    const _player = this.playersSelected.find(p => p?.id == player.id)
    if (_player) {
      const options:ToastOptions = {
        message:`This player has been selected`,
        duration:1000,
        position:'bottom',
        color:'danger',
        cssClass:'red-toast'
        }
      this.toast.create(options).then(toast=>toast.present())
    } else {
      this.onPlayerClicked.emit(player)
      this.popover.dismiss(player,"ok")
      this.showList = false
    }
  }

  onCancel() {
    this.showList = false
  }
}
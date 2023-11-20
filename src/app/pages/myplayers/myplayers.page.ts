import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PlayerFormComponent } from 'src/app/components/player-form/player-form.component';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-myplayers',
  templateUrl: './myplayers.page.html',
  styleUrls: ['./myplayers.page.scss'],
})
export class MyplayersPage implements OnInit {

  players:Player[] = []
  constructor(
    public playerSvc:PlayerService,
    private modal:ModalController,
    private router:Router
  ) { }

  ngOnInit() {
    this.playerSvc.getAll().subscribe(_players => {
      this.players = _players.filter(p => p.team == "Created")
    })
  }
  async presentForm(data:Player | null, onDismiss:(result:any)=>void) {
    const modal = await this.modal.create({
      component:PlayerFormComponent,
      componentProps: {
        player:data
      }
    })
    modal.present()
    modal.onDidDismiss().then(result => {
      if(result?.data) {
        onDismiss(result)
      }
    })
  }

  onNewPlayer() {
    var onDismiss = (info:any) => {
      this.playerSvc.addPlayer(info.data).subscribe()
    }
    this.presentForm(null, onDismiss)
  }

  onDeletePlayer(player:Player) {
    var _player = {...player}
    this.playerSvc.deletePlayer(_player).subscribe()
  }

  toPlayerPage(id:number) {
    this.router.navigate(['/player-info', id])
  }

  onEditPlayer(player:Player) {
    var onDismiss = (info:any) => {
      this.playerSvc.updatePlayer(info.data).subscribe() 
    }
    this.presentForm(player, onDismiss)
  }
}

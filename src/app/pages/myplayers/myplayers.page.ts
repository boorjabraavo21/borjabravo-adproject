import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { PlayerFormComponent } from 'src/app/components/player-form/player-form.component';
import { Pagination } from 'src/app/interfaces/data';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-myplayers',
  templateUrl: './myplayers.page.html',
  styleUrls: ['./myplayers.page.scss'],
})
export class MyplayersPage implements OnInit {
  
  private _players = new BehaviorSubject<Player[]>([])
  public players$ = this._players.asObservable()
  private _pagination = new BehaviorSubject<Pagination>({page:0, pageCount: 0, pageSize:0, total:0})
  public pagination$ = this._pagination.asObservable()
  constructor(
    public playerSvc:PlayerService,
    private modal:ModalController,
    private toast:ToastController,
    private router:Router
  ) { }

  ngOnInit() {
    this.onLoadPlayers()
  }

  onLoadPlayers(page:number = 0, refresh:any = null) {
    this.playerSvc.query("").subscribe(response => {
      this._players.next(response.data.filter(p => p.team == "Created"))
      this._pagination.next(response.pagination)
    })

    if(refresh)
      refresh.complete()
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
      this.playerSvc.addPlayer(info.data).subscribe(obs => {
        this.onLoadPlayers();
        const options:ToastOptions = {
        message:`User created`, //mensaje del toast
        duration:1000, // 1 segundo
        position:'bottom', // el toast se situa en la parte inferior
        color:'tertiary', // color del toast
        cssClass:'fav-ion-toast'
        }
        this.toast.create(options).then(toast=>toast.present())
      })
    }
    this.presentForm(null, onDismiss)
  }

  onDeletePlayer(player:Player) {
    var _player = {...player}
    this.playerSvc.deletePlayer(_player).subscribe(obs => {
      this.onLoadPlayers();
      const options:ToastOptions = {
      message:`User deleted`, //mensaje del toast
      duration:1000, // 1 segundo
      position:'bottom', // el toast se situa en la parte inferior
      color:'danger', // color del toast
      cssClass:'fav-ion-toast'
      }
      this.toast.create(options).then(toast=>toast.present())
    })
  }

  toPlayerPage(id:number) {
    this.router.navigate(['/player-info', id])
  }

  onEditPlayer(player:Player) {
    var onDismiss = (info:any) => {
      this.playerSvc.updatePlayer(info.data).subscribe(obs => {
        this.onLoadPlayers();
        const options:ToastOptions = {
        message:`User edited`, //mensaje del toast
        duration:1000, // 1 segundo
        position:'bottom', // el toast se situa en la parte inferior
        color:'tertiary', // color del toast
        cssClass:'fav-ion-toast'
        }
        this.toast.create(options).then(toast=>toast.present())
      })
    }
    this.presentForm(player, onDismiss)
  }
}

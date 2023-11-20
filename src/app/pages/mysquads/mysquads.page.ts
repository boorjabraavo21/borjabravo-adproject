import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SquadFormComponent } from 'src/app/components/squad-form/squad-form.component';
import { Squad } from 'src/app/interfaces/squad';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-mysquads',
  templateUrl: './mysquads.page.html',
  styleUrls: ['./mysquads.page.scss'],
})
export class MySquadsPage implements OnInit {

  constructor(
    public squads:SquadService,
    private modal:ModalController
  ) { }

  ngOnInit() {
  }

  async presentForm(data:Squad | null, onDismiss:(result:any)=>void) {
    const modal = await this.modal.create({
      component:SquadFormComponent,
      componentProps: {
        squad:data
      }
    })
    modal.present()
    modal.onDidDismiss().then(result => {
      if(result?.data) {
        onDismiss(result)
      }
    })
  }

  onNewSquad() {
    var onDismiss = (info:any) => {
      this.squads.addSquad(info.data).subscribe()
    }
    this.presentForm(null, onDismiss)
  }

}

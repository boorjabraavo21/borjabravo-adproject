import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { SquadFormComponent } from 'src/app/components/squad-components/squad-form/squad-form.component';
import { Pagination } from 'src/app/interfaces/data';
import { Squad } from 'src/app/interfaces/squad';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-mysquads',
  templateUrl: './mysquads.page.html',
  styleUrls: ['./mysquads.page.scss'],
})
export class MySquadsPage implements OnInit {

  private _squads = new BehaviorSubject<Squad[]>([])
  public squads$ = this._squads.asObservable()
  private _pagination = new BehaviorSubject<Pagination>({page:0, pageCount: 0, pageSize:0, total:0})
  public pagination$ = this._pagination.asObservable()
  constructor(
    public squads:SquadService,
    private modal:ModalController
  ) { }

  ngOnInit() {
    this.onLoadSquads()
  }

  onLoadSquads(page:number = 0, refresh:any = null) {
    this.squads.query("").subscribe(response => {
      this._squads.next(response.data)
      this._pagination.next(response.pagination)
    })

    if(refresh)
      refresh.complete()
  }

  async presentForm(data:Squad | null, onDismiss:(result:any)=>void) {
    const modal = await this.modal.create({
      component:SquadFormComponent,
      componentProps: {
        squad:data
      },
      cssClass:'squad-modal'
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
      this.squads.addSquad(info.data).subscribe(_=>{
        this.onLoadSquads()
      })
    }
    this.presentForm(null, onDismiss)
  }

  onEditSquad(squad:Squad) {
    var onDismiss = (info:any) => {
      this.squads.updateSquad(info.data).subscribe(_=>{
        this.onLoadSquads()
      })
    }
    this.presentForm(squad, onDismiss)
  }

  onDeleteSquad(squad:Squad) {
    this.squads.deleteSquad(squad).subscribe(_=>{
      this.onLoadSquads()
    })
  }

}

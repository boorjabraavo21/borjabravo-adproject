import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, IonPopover, ModalController } from '@ionic/angular';
import { Squad } from 'src/app/interfaces/squad';

@Component({
  selector: 'app-squad-form',
  templateUrl: './squad-form.component.html',
  styleUrls: ['./squad-form.component.scss'],
})
export class SquadFormComponent  implements OnInit {

  form:FormGroup
  mode:'Edit' | 'New' = 'New'
  lineUp: string | undefined
  showSquadLineUp = false
  @Input() set squad(_squad:Squad|null) {
    if(_squad) {
      this.mode = 'Edit'
      this.form.controls['id'].setValue(_squad.id)
      this.form.controls['badge'].setValue(_squad.badge)
      this.form.controls['name'].setValue(_squad.name)
      this.form.controls['lineUp'].setValue(_squad.lineUp)
    }
  }
  constructor(
    private formB:FormBuilder,
    private modal:ModalController
  ) { 
    this.form = formB.group({
      id:[null],
      badge:['',[Validators.required]],
      name:['',[Validators.required]],
      lineUp:['',[Validators.required]]
    })
  }

  ngOnInit() {}

  onSubmit() {
    this.modal.dismiss(this.form.value, 'ok')
  }

  onSelectLineUp(popover:IonPopover, input:IonInput, lineUp:string) {
    this.lineUp = lineUp
    input.value = lineUp
    if (lineUp != '') {
      this.showSquadLineUp = true
    }
    popover.dismiss()
  }
}
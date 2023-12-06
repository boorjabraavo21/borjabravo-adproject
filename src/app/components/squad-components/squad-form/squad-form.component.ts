import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, IonPopover, ModalController } from '@ionic/angular';
import { Player } from 'src/app/interfaces/player';
import { Squad } from 'src/app/interfaces/squad';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-squad-form',
  templateUrl: './squad-form.component.html',
  styleUrls: ['./squad-form.component.scss'],
})
export class SquadFormComponent  implements OnInit {

  playersAdded:Player[] = []
  form:FormGroup
  mode:'Edit' | 'New' = 'New'
  lineUp: string | undefined
  @Input() set squad(_squad:Squad|null) {
    if(_squad) {
      this.mode = 'Edit'
      this.form.controls['id'].setValue(_squad.id)
      this.form.controls['name'].setValue(_squad.name)
      this.form.controls['lineUp'].setValue(_squad.lineUp)
      this.form.controls['players'].setValue(_squad.players)
      this.playersAdded = _squad.players
    }
  }
  constructor(
    private formB:FormBuilder,
    private modal:ModalController,
    public playerSvc:PlayerService
  ) { 
    this.form = formB.group({
      id:[null],
      name:['',[Validators.required]],
      lineUp:['',[Validators.required]],
      players:[[],[Validators.required]]
    })
  }

  ngOnInit() {
    console.log(this.form.controls['players'].value)
  }

  onSubmit() {
    this.modal.dismiss(this.form.value, 'ok')
  }

  getPlayer(id:number) {
    return this.playersAdded.find(p => p.id = id)
  }

  onSelectLineUp(popover:IonPopover, input:IonInput, lineUp:string) {
    this.form.controls['lineUp'].setValue(lineUp)
    this.lineUp = lineUp
    input.value = lineUp
    this.playersAdded = []
    this.form.controls['players'].setValue([])
    popover.dismiss()
  }

  onAddPlayer(player:Player) {
    const index = this.playersAdded?.findIndex(p => p != null)
    if(index) {
      var _players = [...this.playersAdded!!]
      _players = [..._players.slice(0, index),..._players.slice(index+1)]
      this.playersAdded = _players
      console.log(this.playersAdded.length)
    }
    this.playersAdded.push(player)
    if (this.playersAdded.length == 11)
      this.form.controls['players'].setValue(this.playersAdded)
  }
}
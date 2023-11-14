import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, IonPopover } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';

export const PLAYER_SELECTABLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PlayerSearcherComponent),
  multi: true
}

@Component({
  selector: 'app-player-searcher',
  templateUrl: './player-searcher.component.html',
  styleUrls: ['./player-searcher.component.scss'],
  providers: [PLAYER_SELECTABLE_VALUE_ACCESSOR]
})
export class PlayerSearcherComponent  implements OnInit, ControlValueAccessor {

  playerSelected: Player | undefined
  disabled: boolean = true
  players: Player[] = []
  propagateChange = (obj:any) => {}

  constructor(
    public plySvc:PlayerService,
    private router:Router
  ) { }

  async onLoadPlayers() {
    this.players = await lastValueFrom(this.plySvc.getAll())
  }

  private async selectPlayer(id:number | undefined, propagate = false) {
    if(id)
      this.playerSelected = await lastValueFrom(this.plySvc.getPlayer(id))
    else
      this.playerSelected = undefined
    if (propagate && this.playerSelected)
      this.propagateChange(this.playerSelected.id)
  }
  writeValue(obj: any): void {
    this.selectPlayer(obj)
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
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

  onPlayerClicked(popover:IonPopover, player:Player){
    this.selectPlayer(player.id, true);
    this.router.navigate(['/player-info',player.id])

    popover.dismiss();
  }
}
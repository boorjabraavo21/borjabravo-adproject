import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayerComponent } from 'src/app/components/player/player.component';
import { PlayerDetailComponent } from 'src/app/components/player-detail/player-detail.component';
import { PlayerSearcherComponent } from 'src/app/components/player-searcher/player-searcher.component';
import { PlayerItemComponent } from 'src/app/components/player-item/player-item.component';
import { SquadFormComponent } from 'src/app/components/squad-form/squad-form.component';
import { PlayerFormComponent } from 'src/app/components/player-form/player-form.component';




@NgModule({
  declarations: [PlayerComponent, PlayerDetailComponent, PlayerSearcherComponent, PlayerItemComponent, SquadFormComponent, PlayerFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [CommonModule,
    FormsModule,
    IonicModule,PlayerComponent, PlayerDetailComponent, PlayerSearcherComponent, PlayerItemComponent, SquadFormComponent, PlayerFormComponent]
})
export class SharedModule { }

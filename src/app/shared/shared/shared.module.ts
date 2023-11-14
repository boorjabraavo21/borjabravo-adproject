import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayerComponent } from 'src/app/components/player/player.component';
import { PlayerDetailComponent } from 'src/app/components/player-detail/player-detail.component';
import { PlayerSearcherComponent } from 'src/app/components/player-searcher/player-searcher.component';
import { PlayerItemComponent } from 'src/app/components/player-item/player-item.component';
import { TeamFormComponent } from 'src/app/components/team-form/team-form.component';



@NgModule({
  declarations: [PlayerComponent, PlayerDetailComponent, PlayerSearcherComponent, PlayerItemComponent, TeamFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [CommonModule,
    FormsModule,
    IonicModule,PlayerComponent, PlayerDetailComponent, PlayerSearcherComponent, PlayerItemComponent, TeamFormComponent]
})
export class SharedModule { }

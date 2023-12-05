import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
<<<<<<< Updated upstream
import { PlayerComponent } from 'src/app/components/player/player.component';
import { PlayerDetailComponent } from 'src/app/components/player-detail/player-detail.component';
import { PlayerSearcherComponent } from 'src/app/components/player-searcher/player-searcher.component';
import { PlayerItemComponent } from 'src/app/components/player-item/player-item.component';
import { SquadFormComponent } from 'src/app/components/squad-form/squad-form.component';
import { PlayerFormComponent } from 'src/app/components/player-form/player-form.component';



=======
import { PlayerComponent } from 'src/app/components/player-components/player/player.component';
import { PlayerDetailComponent } from 'src/app/components/player-components/player-detail/player-detail.component';
import { PlayerSearcherComponent } from 'src/app/components/player-components/player-searcher/player-searcher.component';
import { PlayerItemComponent } from 'src/app/components/player-components/player-item/player-item.component';
import { SquadFormComponent } from 'src/app/components/squad-components/squad-form/squad-form.component';
import { PlayerFormComponent } from 'src/app/components/player-components/player-form/player-form.component';
import { RouterModule } from '@angular/router';
import { SquadComponent } from '../components/squad-components/squad/squad.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { PlayerCardComponent } from '../components/player-components/player-card/player-card.component';
import { HeaderComponent } from '../components/header/header.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../services/custom-translate.service';
import { HttpClient } from '@angular/common/http';
>>>>>>> Stashed changes

@NgModule({
  declarations: [ SquadFormComponent, SquadComponent, LoginFormComponent, PlayerCardComponent, 
    PlayerComponent, PlayerDetailComponent, PlayerFormComponent, PlayerItemComponent, PlayerSearcherComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< Updated upstream
    ReactiveFormsModule
=======
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
>>>>>>> Stashed changes
  ],
  exports: [CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    RouterModule, TranslateModule, SquadFormComponent, SquadComponent, LoginFormComponent, PlayerCardComponent, 
    PlayerComponent, PlayerDetailComponent, PlayerFormComponent, PlayerItemComponent, PlayerSearcherComponent, HeaderComponent]
})
export class SharedModule { }

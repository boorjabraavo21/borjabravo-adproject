import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyteamsPageRoutingModule } from './myteams-routing.module';

import { MyteamsPage } from './myteams.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MyteamsPageRoutingModule
  ],
  declarations: [MyteamsPage]
})
export class MyteamsPageModule {}

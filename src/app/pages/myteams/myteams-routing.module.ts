import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyteamsPage } from './myteams.page';

const routes: Routes = [
  {
    path: '',
    component: MyteamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyteamsPageRoutingModule {}

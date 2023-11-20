import { NgModule } from '@angular/core';



import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MySquadsPage } from './mysquads.page';
import { MySquadsPageRoutingModule } from './mysquads-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MySquadsPageRoutingModule
  ],
  declarations: [MySquadsPage]
})
export class MySquadsPageModule {}

import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'player-info/:id',
    loadChildren: () => import('./pages/player-info/player-info.module').then( m => m.PlayerInfoPageModule)
  },
  {
    path: 'mysquads',
    loadChildren: () => import('./pages/mysquads/mysquads.module').then( m => m.MySquadsPageModule)
  },
  {
    path: 'myplayers',
    loadChildren: () => import('./pages/myplayers/myplayers.module').then( m => m.MyplayersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static HttpClientModule: any[] | Type<any> | ModuleWithProviders<{}>;
}

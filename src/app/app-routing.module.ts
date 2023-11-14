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
    path: 'myteams',
    loadChildren: () => import('./pages/myteams/myteams.module').then( m => m.MyteamsPageModule)
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

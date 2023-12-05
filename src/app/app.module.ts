import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';
import { DataStrapiService } from './services/api/strapi/data-strapi.service';
import { ApiService } from './services/api/api.service';
import { HttpClientWebProvider } from './services/http/http-client-web.provider';
import { JwtService } from './services/jwt.service';
import { createTranslateLoader } from './services/custom-translate.service';
import { HttpClientProvider } from './services/http/http-client.provider';
import { AuthService } from './services/api/auth.service';
import { DataService } from './services/api/data.service';
import { AuthStrapiService } from './services/api/strapi/auth-strapi.service';

export function DataServiceFactory(
  api:ApiService){
    
        return new DataStrapiService(api);
      
} 
export function httpProviderFactory(
  http:HttpClient,
  platform:Platform) {
  return new HttpClientWebProvider(http);
}

export function AuthServiceFactory(
  jwt:JwtService,
  api:ApiService
) {
    
        return new AuthStrapiService(jwt, api);
      
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule
    ],
  providers: [
    {
      provide: 'home',
      useValue:'/home'
    },
    {
      provide: 'login',
      useValue:'/login'
    },
    {
      provide: 'afterLogin',
      useValue:'/home'
    },
    {
      provide: 'splash',
      useValue:'/splash'
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HttpClientProvider,
      deps: [HttpClient, Platform],
      useFactory: httpProviderFactory,  
    },
    {
      provide: AuthService,
      deps: [JwtService, ApiService],
      useFactory: AuthServiceFactory,  
    },
    {
      provide: DataService,
      deps: [ApiService],
      useFactory: DataServiceFactory,  
    },
    
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
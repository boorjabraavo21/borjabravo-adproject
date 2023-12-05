import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
<<<<<<< Updated upstream
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
=======
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtService } from './services/jwt.service';
import { ApiService } from './services/api/api.service';
import { AuthStrapiService } from './services/api/strapi/auth-strapi.service';
import { HttpClientProvider } from './services/http/http-client.provider';
import { AuthService } from './services/api/auth.service';
import { HttpClientWebProvider } from './services/http/http-client-web.provider';
import { DataStrapiService } from './services/api/strapi/data-strapi.service';
import { DataService } from './services/api/data.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './services/custom-translate.service';
import { SharedModule } from './shared/shared.module';

export function httpProviderFactory(
  http:HttpClient,
  platform:Platform) {
  return new HttpClientWebProvider(http);
}

export function DataServiceFactory(
  api:ApiService){
    return new DataStrapiService(api);
} 

export function AuthServiceProvider(
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    SharedModule
    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: 'backend',
      useValue:'Strapi'
    },
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
    {
      provide: HttpClientProvider,
      deps: [HttpClient, Platform],
      useFactory: httpProviderFactory,  
    },
    {
      provide: AuthService,
      deps: [JwtService, ApiService],
      useFactory: AuthServiceProvider,  
    },
    {
      provide: DataService,
      deps: [ApiService],
      useFactory: DataServiceFactory,  
    }
  ],
>>>>>>> Stashed changes
  bootstrap: [AppComponent],
})
export class AppModule {}
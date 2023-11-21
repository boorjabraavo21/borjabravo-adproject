import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientProvider } from './services/http/http-client.provider';
import { HttpClientWebProvider } from './services/http/http-client-web.provider';
import { JwtService } from './services/jwt.service';
import { AuthService } from './services/api/auth.service';
import { ApiService } from './services/api/api.service';
import { AuthStrapiService } from './services/api/strapi/auth-strapi.service';
import { DataService } from './services/api/data.service';
import { StapiDataService } from './services/api/strapi/stapi-data.service';
import { SharedModule } from './shared/shared.module';

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

export function DataServiceFactory(
  api:ApiService){
    return new StapiDataService(api);
} 

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SharedModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              { provide: HttpClientProvider, deps: [HttpClient, Platform], useFactory: httpProviderFactory },
              { provide: AuthService, deps: [JwtService, AuthService], useFactory:AuthServiceFactory },
              { provide: DataService, deps: [ApiService], useFactory: DataServiceFactory }],
  bootstrap: [AppComponent],
})
export class AppModule {}

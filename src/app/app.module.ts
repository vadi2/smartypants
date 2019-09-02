import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaunchComponent } from './launch/launch.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OauthRedirectComponent } from './oauth-redirect/oauth-redirect.component';
import { OauthFlowCompletedComponent } from './oauth-flow-completed/oauth-flow-completed.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    LaunchComponent,
    PageNotFoundComponent,
    OauthRedirectComponent,
    OauthFlowCompletedComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

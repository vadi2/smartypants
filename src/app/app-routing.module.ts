import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaunchComponent } from './launch/launch.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OauthRedirectComponent } from './oauth-redirect/oauth-redirect.component';

const routes: Routes = [
  { path: 'launch', component: LaunchComponent },
  { path: 'oauth-redirect', component: OauthRedirectComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  // declarations: [LaunchComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }

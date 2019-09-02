import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaunchComponent } from './launch/launch.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OauthRedirectComponent } from './oauth-redirect/oauth-redirect.component';
import { OauthFlowCompletedComponent } from './oauth-flow-completed/oauth-flow-completed.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: 'launch', component: LaunchComponent },
  { path: 'oauth-redirect', component: OauthRedirectComponent },
  { path: 'oauth-completed', component: OauthFlowCompletedComponent },
  { path: '', component: HomepageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  // declarations: [LaunchComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }

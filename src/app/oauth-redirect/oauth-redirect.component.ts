import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-oauth-redirect',
  templateUrl: './oauth-redirect.component.html',
  styleUrls: ['./oauth-redirect.component.css']
})
export class OauthRedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private backend: BackendService
  ) { }

  code: string;
  state: string;
  stateError: string;

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(p => this.code = p.get('code'));

    this.route.queryParamMap
      .subscribe(p => this.state = p.get('state'));

    this.stateError = this.backend.exchangeAuthorizationcode(this.code, this.state);
  }

}

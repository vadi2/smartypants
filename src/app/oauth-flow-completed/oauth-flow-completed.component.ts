import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-oauth-flow-completed',
  templateUrl: './oauth-flow-completed.component.html',
  styleUrls: ['./oauth-flow-completed.component.css']
})
export class OauthFlowCompletedComponent implements OnInit {
  bearerToken: string;
  fhirEndpoint: string;

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.bearerToken = this.backend.accessToken;
    this.fhirEndpoint = this.backend.fhirEndpoint;
  }

}

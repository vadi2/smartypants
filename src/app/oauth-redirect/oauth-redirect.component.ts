import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-oauth-redirect',
  templateUrl: './oauth-redirect.component.html',
  styleUrls: ['./oauth-redirect.component.css']
})
export class OauthRedirectComponent implements OnInit {

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.printTokenLocation();
  }

}

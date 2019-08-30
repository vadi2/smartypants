import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {  } from 'jsonpath';
import * as jsonpath from 'jsonpath';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  iss: string;
  launch: string;
  readonly wellKnownLocation = '/.well-known/smart-configuration.json';
  readonly metadataLocation = '/metadata';
  authorizeLocation: string;
  tokenLocation: string;

  // OAuth configuration data
  readonly clientId = 'client12345';
  // should be retrieved from the route data
  readonly redirectUri = `${window.location.origin}/oauth-redirect`;


  constructor(private http: HttpClient) { }

  setLaunchParameters(launch: string, iss: string) {
    this.launch = launch;
    this.iss = iss;
  }

  fetchOAuthEndpoints() {
    // fetch well known location first
    this.http.get(this.iss + this.wellKnownLocation).subscribe((res: Response) => {
      console.log(res);
    }, error => {
      if (error.status !== 404) {
        console.log(error);
      }

      // if that doesn't work fallback to /metadata
      this.fetchOAuthFromMetadata();
    });
  }

  fetchOAuthFromMetadata() {
    this.http.get<[]>(this.iss + this.metadataLocation).subscribe((res: {}) => {
      const response = this.extractOAuthFromMetadata(res);
      this.authorizeLocation = response.authorize;
      this.tokenLocation = response.token;

      // this is horrible and should not be so
      const oAuthRedirect = `${this.authorizeLocation}?`
        + `response_type=code&`
        + `client_id=${encodeURIComponent(this.clientId)}&`
        + `redirect_uri=${encodeURIComponent(this.redirectUri)}&`
        + `launch=${encodeURIComponent(this.launch)}&`
        + `scope=${encodeURIComponent('patient/*.read')}&`
        + `state=1234&`
        + `aud=${encodeURIComponent(this.iss)}`;

      console.log(oAuthRedirect);
      window.location.replace(oAuthRedirect);
    }, error => {
      console.log(error);
    });
  }

  extractOAuthFromMetadata(metadata: {}): { authorize: string, token: string } {
    let authorize: string;
    let token: string;
    // console.log(`extracted ${jsonpath.query(metadata, '$.rest[*].security.extension[*].url')}`);
    // coming up with the correct jsonpath was proving unduly difficult, esp filtering by the key part
    metadata.rest[0].security.extension.forEach(element => {
      if (element.url === 'http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris') {
        element.extension.forEach(extension => {
          if (extension.url === 'authorize') {
            authorize = extension.valueUri;
          } else if (extension.url === 'token') {
            token = extension.valueUri;
          }
        });
      }
    });

    console.log(`${authorize} and ${token}`);
    return { authorize, token };
  }

}

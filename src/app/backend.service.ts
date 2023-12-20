import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import {  } from 'jsonpath';
import * as jsonpath from 'jsonpath';
import * as uuid from 'uuid';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

const TOKEN_URL_KEY = 'token-url-key';
const STATE_KEY = 'state-key';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  readonly wellKnownLocation = '/.well-known/smart-configuration.json';
  readonly metadataLocation = '/metadata';

  fhirEndpoint: string; // iss in SMART on FHIR
  launch: string; // Opaque identifier for this specific launch and any EHR context associated with it. This parameter must be communicated back to the EHR at authorization time by passing along a launch parameter (see example below).

  // where you go first to greet yourself and get an authorization code
  authorizeLocation: string;
  // afterwards, exchange said code for a token
  tokenLocation: string;

  // OAuth configuration data
  readonly clientId = '9deb48a7-203c-4300-acb9-e1b00b601e2a';
  // should be retrieved from the route data
  readonly redirectUri = `${window.location.origin}/oauth-redirect`;

  // this information is populated upon successful OAuth negotiation
  accessToken: string;
  expiresIn: number;
  needPatientBanner: boolean;
  grantedScope: string;
  smartStyleUrl: string;
  tokenType: string;

  constructor(
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private router: Router
  ) {
    this.tokenLocation = this.storage.get(TOKEN_URL_KEY);
  }

  setLaunchParameters(launch: string, iss: string) {
    this.launch = launch;
    this.fhirEndpoint = iss;
    console.log(`Got launch parameters, FHIR endpoint: ${this.fhirEndpoint}, launch: ${this.launch}`);
  }

  fetchOAuthEndpoints() {
    // fetch well known location first
    this.http.get(this.fhirEndpoint + this.wellKnownLocation).subscribe((res: Response) => {
      console.log(`Got well known location: ${this.fhirEndpoint + this.wellKnownLocation}`);
    }, error => {
      if (error.status !== 404) {
        console.log(`Error fetching well known location: ${this.fhirEndpoint + this.wellKnownLocation}`);
      }

      // if that doesn't work fallback to /metadata
      this.fetchOAuthFromMetadata();
    });
  }

  fetchOAuthFromMetadata() {
    this.http.get<[]>(this.fhirEndpoint + this.metadataLocation).subscribe((res: {}) => {
      const response = this.extractOAuthFromMetadata(res);
      this.authorizeLocation = response.authorize;
      this.tokenLocation = response.token;
      this.storage.set(TOKEN_URL_KEY, this.tokenLocation);

      const newState = uuid.v4();
      this.storage.set(STATE_KEY, newState);

      // this is horrible and should not be so
      const oAuthRedirect = `${this.authorizeLocation}?`
        + `response_type=code&`
        + `client_id=${encodeURIComponent(this.clientId)}&`
        + `redirect_uri=${encodeURIComponent(this.redirectUri)}&`
        + `launch=${encodeURIComponent(this.launch)}&`
        + `scope=${encodeURIComponent('openid Patient.read Patient.search')}&`
        + `state=${encodeURIComponent(newState)}&`
        + `aud=${encodeURIComponent(this.fhirEndpoint)}`;

      console.log(`Got oauth information from metadata, redirecting to ${oAuthRedirect}`);
      window.location.replace(oAuthRedirect);
    }, error => {
      console.log(`Error fetching metadata: ${this.fhirEndpoint + this.metadataLocation}`);
    });
  }

  extractOAuthFromMetadata(metadata: any): { authorize: string, token: string } {
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

  exchangeAuthorizationcode(code: string, state: string): any {
    if (state !== this.storage.get(STATE_KEY)) {
      console.log(`State mismatch, authorization cannot continue. Got ${state} versus ${this.storage.get(STATE_KEY)}`);
      return 'OAuth server gave us back the wrong state - authorization cannot continue.';
    }

    const payload = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId);

    return this.http.post<{}>(this.tokenLocation, payload);
  }

  extractAuthorizedData(authorizationResponse: any) {
    this.accessToken = authorizationResponse.access_token;
    this.expiresIn = authorizationResponse.expires_in;
    this.needPatientBanner = authorizationResponse.need_patient_banner;
    this.grantedScope = authorizationResponse.scope;
    this.smartStyleUrl = authorizationResponse.smart_style_url;
    this.tokenType = authorizationResponse.token_type;

    this.router.navigate(['/oauth-completed']);
  }
}

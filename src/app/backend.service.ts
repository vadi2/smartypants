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

  constructor(private http: HttpClient) { }

  setLaunchParameters(launch: string, iss: string) {
    this.launch = launch;
    this.iss = iss;
  }

  locateEndpoints() {

  }

  fetchWellKnownConfiguration() {
    this.http.get(this.iss + this.wellKnownLocation).subscribe((res: Response) => {
      console.log(res);
    }, error => {
      if (error.status !== 404) {
        console.log(error);
      }

      this.fetchOAuthFromMetadata();
    });
  }

  fetchOAuthFromMetadata() {
    this.http.get<[]>(this.iss + this.metadataLocation).subscribe((res: {}) => {
      this.extractOAuthFromMetadata(res);
    }, error => {
      console.log(error);
    });
  }

  extractOAuthFromMetadata(metadata: {}) {
    // console.log(`extracted ${jsonpath.query(metadata, '$.rest[*].security.extension[*].url')}`);
    // using jsonpath with angular was proving unduly difficult
    metadata.rest[0].security.extension.forEach(element => {
      if (element.url === 'http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris') {
        element.extension.forEach(extension => {
          if (extension.url === 'authorize') {
            this.authorizeLocation = extension.valueUri;
          } else if (extension.url === 'token') {
            this.tokenLocation = extension.valueUri;
          }
        });
      }
    });
    console.log(`${this.authorizeLocation} and ${this.tokenLocation}`);
  }
}

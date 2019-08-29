import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  iss: string;
  launch: string;
  readonly wellKnownLocation = '/.well-known/smart-configuration.json';
  readonly metadataLocation = "/metadata";

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
    console.log('extracting');
    console.log(metadata.rest);
  }
}

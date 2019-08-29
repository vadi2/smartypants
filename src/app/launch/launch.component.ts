import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let iss: string;
    this.route
      .queryParamMap
      .pipe(map(params => params.get('iss'))).forEach(element => {
        iss = element;
      });

      console.log("iss is "+iss);

    // sessionId.forEach(element => {
    //   console.log("raralala " + element);
    // });
  }

}

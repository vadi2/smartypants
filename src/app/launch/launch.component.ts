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
  iss = 'nothing';
  launch = 'nothing';

  constructor(private route: ActivatedRoute) { }

  // iss: string;
  // launch: string;

  ngOnInit() {

    this.route
      .queryParamMap
      .pipe(map(params => params.get('iss'))).forEach(element => {
        this.iss = element;
      });

    this.route
      .queryParamMap
      .pipe(map(params => params.get('launch'))).forEach(element => {
        this.launch = element;
      });

    // sessionId.forEach(element => {
    //   console.log("raralala " + element);
    // });
  }

}

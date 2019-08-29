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

  iss: string;
  launch: string;

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(p => this.iss = p.get('iss'));

    this.route.queryParamMap
      .subscribe(p => this.launch = p.get('launch'));
  }
}

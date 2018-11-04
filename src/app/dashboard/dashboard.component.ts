import { Component, OnInit } from '@angular/core';
import { DjangoService } from '../django.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  courses: object;

  constructor(
    private django: DjangoService,
  ) { }

  ngOnInit() {
    this.django.getRegClasses().subscribe(
      (data:object) => this.courses = data
    );

  }



}

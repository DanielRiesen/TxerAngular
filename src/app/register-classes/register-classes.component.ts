import { Component, OnInit } from '@angular/core';
import { DjangoService } from '../django.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-classes',
  templateUrl: './register-classes.component.html',
  styleUrls: ['./register-classes.component.scss']
})
export class RegisterClassesComponent implements OnInit {

  courses: object;
  model: any = {};

  constructor(
    private django:DjangoService,
    private router: Router
  ) { }



  ngOnInit() {
    this.django.getGoogleCourses().subscribe(
      (data:object) => this.courses = data['courses']
    );

  }

  public reRoute(route) {
    this.router.navigate([route])
  }

  onSubmit() {
    this.django.registerGoogleClasses(this.model['Courses']).subscribe(console.log)
    this.reRoute('/')
  }

  

}

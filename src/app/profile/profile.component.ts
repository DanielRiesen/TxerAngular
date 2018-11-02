import { Component, OnInit, Input } from '@angular/core';
import { DjangoService } from '../django.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  schools: Object;

  constructor(
    private django:DjangoService,
    private router:Router) { }


  ngOnInit() {
    this.django.getSchools().subscribe(
      data => this.schools = data
    );
  }

  public reRoute(route) {
    this.router.navigate([route])
  }

  model: any = {};

  onSubmit() {
    for (let cur in this.model) {
      sessionStorage.setItem(cur, this.model[cur])
    }
    this.reRoute('/permisson')
  }

}

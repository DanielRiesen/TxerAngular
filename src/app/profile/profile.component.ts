import { Component, OnInit, Input } from '@angular/core';
import { DjangoService } from '../django.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  schools: Object;
  userState: boolean;

  constructor(
    private django:DjangoService,
    private router:Router) { }


  ngOnInit() {
    this.django.isUserLoggedIn.subscribe(data => {
      this.userState = data;
    })
  }

  public reRoute(route) {
    this.router.navigate([route])
  }

  model: any = {};
 


  onSubmit() {
    for (let cur in this.model) {
      sessionStorage.setItem(cur, this.model[cur])
      console.log(cur)

    }

    if (this.userState === true) {
      this.django.updateProfile({username: sessionStorage.getItem('username'), desc: sessionStorage.getItem('desc'), school: sessionStorage.getItem("school"), teacher: sessionStorage.getItem('teacher')}).subscribe((data) =>
        this.django.currentUserDetails.next(
          {username: sessionStorage.getItem('username'),
           desc: sessionStorage.getItem('desc'),
           school: sessionStorage.getItem("school"),
           teacher: sessionStorage.getItem('teacher')
          })
      )
      this.reRoute('/dashboard')
    }
    else {
      this.reRoute('/permisson')
    }
  }

}

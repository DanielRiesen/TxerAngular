import { Component, OnInit, NgZone } from '@angular/core';
import { DjangoService } from '../django.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private django: DjangoService,
    private zone: NgZone,
    private router: Router,
  ) { }

  ngOnInit() {
    this.django.logoutUser()
    this.zone.run(() => { this.router.navigate(['dashboard']) })
  }

}

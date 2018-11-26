import { Component, OnInit } from '@angular/core';
import { DjangoService } from '../django.service';
import { GoogleAuthService } from 'ng-gapi';
import { UserServicesService } from '../user-services.service';
import { GoogleApiService } from 'ng-gapi';
import { Router } from '@angular/router';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],

})
export class SidebarComponent implements OnInit {
  public sheetId: string;
  public sheet: any;
  public foundSheet: any;
  public auth2: any;
  public userStatus: boolean = false;
  public scopes: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.announcements https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/classroom.rosters';



  constructor(
    private userService: UserServicesService,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService,
    private django: DjangoService,
    private router: Router, ) {
    // First make sure gapi is loaded can be in AppInitilizer
    gapiService.onLoad().subscribe(() => {

    });
  }

  user: Object;

  ngOnInit() {

    this.django.isUserLoggedIn.subscribe((status) => {
      if (status) {
        $(document).mouseup(function (e) {
          var container = $("dropdown");
    
          // if the target of the click isn't the container nor a descendant of the container
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            document.getElementById("dropdown").style.display = "none"
            document.getElementById("arrow").style.transform = "rotate(0deg)"
          }
        });
      }
    })
    

    this.initUser().then(data => this.django.currentUserDetails.next(data))

    this.django.isUserLoggedIn.subscribe((status) => {

      console.log('called')
      if (status) {
        this.django.currentUserDetails.subscribe(data => {
          this.user = data
        })
        this.userStatus = true
      }
      else {
        this.userStatus = false
      }

    })

  }

  private initUser() {
    return new Promise(resolve => {
      this.django.getUserDetails().subscribe((data: any) => { resolve(data) })
    })
  }

  public show() {
    if (document.getElementById("dropdown").style.display === "inline") {
      document.getElementById("dropdown").style.display = "none"
      document.getElementById("arrow").style.transform = "rotate(0deg)"
    }
    else {
      document.getElementById("dropdown").style.display = "inline"
      document.getElementById("arrow").style.transform = "rotate(180deg)"
    }

  }

  public hide() {
    document.getElementById("dropdown").style.display = "none"
    document.getElementById("arrow").style.transform = "rotate(0deg)"
  }



  public mpApp() {
    // this.gapiService.onLoad().subscribe(()=> {
    //   gap
    // })
    // this.auth2.currentUser.get().grantOfflineAccess().then(function (code) {
    //   console.log(code)})

  }
}

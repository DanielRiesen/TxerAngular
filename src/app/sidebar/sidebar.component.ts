import { Component, OnInit, Input } from '@angular/core';
import { DjangoService } from '../django.service';
import { GoogleAuthService } from 'ng-gapi';
import { UserServicesService } from '../user-services.service';
import { GoogleApiService } from 'ng-gapi';

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
  public scopes: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.announcements https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/classroom.rosters';

  constructor(
    private userService: UserServicesService,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService,
    private django: DjangoService) {
    // First make sure gapi is loaded can be in AppInitilizer
    gapiService.onLoad().subscribe(() => {

    });
  }

  user: Object;

  ngOnInit() {
    this.django.getUserDetails().subscribe(data => {
      this.user=data
      console.log(data)
      console.log(this.user)
    })

  }

  public mpApp() {
    // this.gapiService.onLoad().subscribe(()=> {
    //   gap
    // })
    // this.auth2.currentUser.get().grantOfflineAccess().then(function (code) {
    //   console.log(code)})

  }
}

import { Component, OnInit, NgZone } from '@angular/core';
import { DjangoService } from '../django.service';
import { GoogleAuthService } from 'ng-gapi';
import { UserServicesService } from '../user-services.service';
import { GoogleApiService } from 'ng-gapi';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  public sheetId: string;
  public sheet: any;
  public foundSheet: any;
  public auth2: any;
  public scopes: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.announcements https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/classroom.rosters';

  constructor(private userService: UserServicesService,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService,
    private django: DjangoService,
    private router: Router,
    private zone: NgZone,) {
    // First make sure gapi is loaded can be in AppInitilizer
    gapiService.onLoad().subscribe(() => {

    });
  }

  

  ngOnInit() {
  }

  

  public test(auth) {
    return Promise.resolve(auth.currentUser.get().grantOfflineAccess())
  }

  public isLoggedIn(): boolean {
    return this.userService.isUserSignedIn();
  }

  public reRoute(route) {
    this.zone.run(() => { this.router.navigate([route]) })
  }

  public signInUser() {




    this.authService.getAuth().subscribe((auth) => {
      auth.signIn().then((response) => {
        this.django.getToken(response).subscribe((data) => {
          if (data['created']) {
          this.reRoute('/profile')
          }
          else {
            sessionStorage.setItem("token", data['token'])
            console.log('/')
            this.reRoute('/dashboard')
          }
        }
          
        )
      })
    })
  }
}

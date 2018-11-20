import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import { UserServicesService } from '../user-services.service';
import { GoogleApiService } from 'ng-gapi';
import { DjangoService } from '../django.service';
import { Router } from '../../../node_modules/@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  constructor(
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService,
    private django: DjangoService,
    private router: Router,
    public zone: NgZone,
  ) { }

  public test(auth) {
    return Promise.resolve(auth.currentUser.get().grantOfflineAccess())
  }

  public reRoute(route) {
    this.zone.run(() => { this.router.navigate([route]) })
  }

  public mpApp() {
    console.log('nice')
    // this.gapiService.onLoad().subscribe(()=> {
    //   gap
    // })
    // this.auth2.currentUser.get().grantOfflineAccess().then(function (code) {
    //   console.log(code)})

  

    this.authService.getAuth().subscribe((auth) => {
        
        var temp: object = this.test(auth);
        Promise.resolve(temp).then((response) => {this.django.sendGoogleCode(response).subscribe((token) =>  {
          sessionStorage.setItem('token', token['token'])
          this.django.updateProfile({username: sessionStorage.getItem('username'), desc: sessionStorage.getItem('desc'), school: sessionStorage.getItem("school"), teacher: sessionStorage.getItem('teacher')}).subscribe((data) => {
            if (data['user_type'] == 'teacher') {
              this.django.isUserLoggedIn.next(true)
              console.log('/reg-classes')
              this.reRoute('/reg-classes')
            }
            else {
              console.log('/')
              this.django.isUserLoggedIn.next(true)
              this.reRoute('/')
            }
          })})
        
      })})}

  ngOnInit() {
  }

}

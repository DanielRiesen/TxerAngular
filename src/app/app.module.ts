import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { DjangoService } from './django.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import {
    GoogleApiModule, 
    GoogleApiService, 
    GoogleAuthService, 
    NgGapiClientConfig, 
    NG_GAPI_CONFIG,
    GoogleApiConfig
} from "ng-gapi";
import { UserServicesService } from './user-services.service';
import { ProfileComponent } from './profile/profile.component';
import { PermissionComponent } from './permission/permission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterClassesComponent } from './register-classes/register-classes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { LogoutComponent } from './logout/logout.component';
import { EnrolledComponent } from './enrolled/enrolled.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { IndexComponent } from './index/index.component';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "962650220393-o5upillndnmij30pdsgktb58fnmm3b4o.apps.googleusercontent.com",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.announcements https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/classroom.rosters'
};

@NgModule({
  declarations: [
    AppComponent,
    GoogleLoginComponent,
    SidebarComponent,
    ProfileComponent,
    PermissionComponent,
    RegisterClassesComponent,
    DashboardComponent,
    TopNavComponent,
    LogoutComponent,
    EnrolledComponent,
    TutorialsComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [DjangoService, UserServicesService],
  bootstrap: [AppComponent ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { ProfileComponent } from './profile/profile.component';
import { PermissionComponent } from './permission/permission.component';
import { RegisterClassesComponent } from './register-classes/register-classes.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'login', component: GoogleLoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'permisson', component: PermissionComponent },
  { path: 'reg-classes', component: RegisterClassesComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

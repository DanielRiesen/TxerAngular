import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DjangoService {

  constructor(private http: HttpClient) { }

  toReturn: Object;

  getUser() {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + sessionStorage.getItem('token')
      })
    };

    console.log("sending key")
    return this.http.get('http://localhost:8000/API/userDetials/', httpOptions)

  }

  getToken(code) {
    var toReturn: string;
    console.log(code)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    var temp: object;
    return this.http.post('http://localhost:8000/API/googleAuth/', code, httpOptions)
  }

  updateProfile(info: object) {
    console.log(info)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token '+sessionStorage.getItem('token'),
      })
    };
    return this.http.post('http://localhost:8000/API/profile/', JSON.stringify(info), httpOptions)
  }

  sendGoogleCode(code) {
    console.log(code['code'])
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',

      })
    };
    return this.http.post('http://localhost:8000/API/googleToken/', JSON.stringify({code: code}), httpOptions)
  }

  getGoogleCourses() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token '+sessionStorage.getItem('token'),
      })
    };
    return this.http.get("http://localhost:8000/API/googleCourses/", httpOptions)
  }

  registerGoogleClasses(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token '+sessionStorage.getItem('token'),
      })
    };
    return this.http.post("http://localhost:8000/API/googleCourses/", data={courses: data}, httpOptions)
  }

  private testToken() {
    if (sessionStorage.getItem('token')) {
      console.log('temp')
      return true

    }
    else {
      console.log('not')
      return false
    }
  }

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.testToken())

  getRegClasses() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+sessionStorage.getItem('token'),
      })
    }

    return this.http.get('http://localhost:8000/API/courses/', httpOptions)

  }

  getUpcomingTutorials() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+sessionStorage.getItem('token'),
      })
    }

    return this.http.get('http://localhost:8000/API/tutorials/', httpOptions)

  }

  getUserDetails() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+sessionStorage.getItem('token'),
      })
    }

    return this.http.get('http://localhost:8000/API/userDetials/', httpOptions)
  }

  logoutUser() {
    this.isUserLoggedIn.next(false)
    sessionStorage.clear()
  }

  currentUserDetails: BehaviorSubject<object> = new BehaviorSubject<object>({})

}

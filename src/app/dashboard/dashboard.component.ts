import { Component, OnInit } from '@angular/core';
import { DjangoService } from '../django.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  courses: object;
  tutorials: object;
  not_reg: Boolean;
  no_tut: Boolean;


  constructor(
    private django: DjangoService,
  ) { }

  ngOnInit() {
    this.not_reg = true
    this.no_tut = true
    this.django.getRegClasses().subscribe(
      (data: object) => {
        this.courses = data
        if (Object.keys(data).length < 1) {
          console.log('nice')
          this.not_reg = true
        }
        else {
          this.not_reg = false
          console.log(data)
        }
      }
    );
    this.django.getUpcomingTutorials().subscribe(
      (data: object) => {
        this.tutorials = data;

        if (Object.keys(data).length < 1) {
          this.no_tut = true
          
        }
        else {
          this.no_tut = false
          for (var i = 0; i < Object.keys(this.tutorials).length; i++) {
            var newDate = new Date(this.tutorials[i]['Start_Time']).toUTCString().split(', ')[1].split(' ').slice(0, 3)
            var newStartTime = new Date(this.tutorials[i]['Start_Time']).toUTCString().split(', ')[1].split(' ')[3].split(':').slice(0, 2)
            var newEndTime = new Date(this.tutorials[i]['End_Time']).toUTCString().split(', ')[1].split(' ')[3].split(':').slice(0, 2)
            console.log(newEndTime)
            if (newStartTime[0][0] === '0') {
              if (Number(newStartTime[0]) > 12) {
                this.tutorials[i]['Start_Time'] = Number(newStartTime[0][1]) - 12 + ":" + newStartTime[1] + "pm"
              }
              else {
                this.tutorials[i]['Start_Time'] = newStartTime[0][1] + ":" + newStartTime[1] + "am"
              }
  
            }
            else {
              if (Number(newStartTime[0]) > 12) {
                this.tutorials[i]['Start_Time'] = Number(newStartTime[0]) - 12 + ":" + newStartTime[1] + "pm"
              }
              else {
                this.tutorials[i]['Start_Time'] = newStartTime[0] + ":" + newStartTime[1] + "am"
              }
  
            }
            if (newEndTime[0][0] === '0') {
              if (Number(newEndTime[0]) > 12) {
                this.tutorials[i]['End_Time'] = Number(newEndTime[0][1]) - 12 + ":" + newEndTime[1] + "pm"
              }
              else {
                this.tutorials[i]['End_Time'] = newEndTime[0][1] + ":" + newEndTime[1] + "am"
              }
  
            }
            else {
              if (Number(newEndTime[0]) > 12) {
                this.tutorials[i]['End_Time'] = Number(newEndTime[0]) - 12 + ":" + newEndTime[1] + "pm"
              }
              else {
                this.tutorials[i]['End_Time'] = newEndTime[0] + ":" + newEndTime[1] + "am"
              }
  
            }
  
            this.tutorials[i]['Start_Date'] = newDate[1] + ' ' + newDate[0] + ', ' + newDate[2]
          }
          console.log(data)
        }
      }
    );
  }



}

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token;
  flag: boolean;
  eventDataTen = [];
  totalEventsWeekly;
  totalUsers;
  totalEvents;
  eventDataFive =[];
  id_user;
  user;
  role;

  constructor(private cookieService: CookieService, private userService: UserService) { 
  
  }




  
  async ngOnInit() {
    this. token = this.cookieService.get('token_log');
    this.id_user = this.cookieService.get("id");
    this.role = this.cookieService.get('role')
    if(this.token){
      this.flag = true
      this.userService.getTopEvent(this.token).subscribe((data: any) => {
        this.eventDataTen = data;
      });
  
      this.userService.getTotalEventWeekly(this.token).subscribe((data: any) => {
        this.totalEventsWeekly = data.total_events
      })
  
      this.userService.getTotalUsers(this.token).subscribe((data: any) => {
        this.totalUsers = data.total_users
      })
  
      this.userService.getTotalEvents(this.token).subscribe((data: any) => {
        this.totalEvents = data.total_events
      })
      
      this.userService.getTop5Event(this.token).subscribe((data:any) => {
        this.eventDataFive = data
      })

      this.UserData();
    }else {
      this.flag = false

      this.userService.getPublicTopEvent().subscribe((data: any) => {
        this.eventDataTen = data;
      });
  
      this.userService.getPublicTotalEventWeekly().subscribe((data: any) => {
        this.totalEventsWeekly = data.total_events
      })
  
      this.userService.getPublicTotalUsers().subscribe((data: any) => {
        this.totalUsers = data.total_users
      })
  
      this.userService.getPublicTotalEvents().subscribe((data: any) => {
        this.totalEvents = data.total_events

      })

      this.userService.getPublicTop5Event().subscribe((data:any) => {
        this.eventDataFive = data
      })

      
    }



  }

  showEvent(id){
    // localStorage.setItem('id_event', id);
    location.href= 'show-event/'+id
  }

  goToPage(page){
    location.href= page
  }


  UserData(){
    this.userService.getDataUser(this.token,this.id_user).subscribe((data: any) => {
      this.user = data;
    })
  }

  logOn(){
    this.cookieService.deleteAll();
    this.cookieService.deleteAll('token', '/');
  
    localStorage.clear();
    location.href = 'login'
  }
}

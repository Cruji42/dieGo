import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';

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
  constructor(private cookieService: CookieService, private userService: UserService) { 
  
  }



  slides = [
    {"image": "assets/img/png/no-image.png"},
    {"image": "assets/img/png/no-image.png"},
    {"image": "assets/img/png/no-image.png"}
   ]



  
  async ngOnInit() {
    this. token = this.cookieService.get('token');
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

      
    }



  }


  goToLogin(){
    location.href='login'
  }

  goToRegister(){
    location.href='register'
  }
}

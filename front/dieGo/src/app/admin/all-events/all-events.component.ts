import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {
  token;
  events;
  user;
  id_user;
  role;

  constructor(private adminService: AdminService, private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {

    this.token = this.cookieService.get('token');
    this.role = this.cookieService.get('role')
    this.id_user = this.cookieService.get("id");

    if(!this.token || this.role !== 'admin' ){ location.href= 'home';} 
    this.getEvents()
    this.UserData()


  }


  getEvents(){
    this.adminService.getAllEvents(this.token).subscribe((data: any) => {
      console.log(data)
      this.events = data;
    })
  }

  UserData(){
    this.userService.getDataUser(this.token,this.id_user).subscribe((data: any) => {
      this.user = data;
    })
  }


  logOn(){
    this.cookieService.deleteAll();
    localStorage.clear();
    location.href = 'login'
  }

  goToPage(page){
    location.href= page
  }


}

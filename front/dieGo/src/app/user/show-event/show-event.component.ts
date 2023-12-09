import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {

  id_user;
  flag: boolean;
  token;
  id_event;
  event;
  role;
  user;

  constructor(private userService: UserService, private cookieService: CookieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_event = this.route.snapshot.paramMap.get('id');
    this.token = this.cookieService.get('token_log');
    this.id_user = this.cookieService.get("id");
    this.role = this.cookieService.get('role')
    if(this.token) {
      this.flag = true;
      this.getEvenInfo();
      this.UserData()
    } else{
      this.getPublicEvenInfo();
    }
  }

  UserData(){
    this.userService.getDataUser(this.token,this.id_user).subscribe((data: any) => {
      this.user = data;
    })
  }

  goToPage(page){
    location.href= page
  }

  getEvenInfo(){
     this.userService.getEvent(this.token, this.id_event).subscribe((data: any)=>{
      this.event = data;
    })
  }

  getPublicEvenInfo(){
    this.userService.getPublicEvent(this.token, this.id_event).subscribe((data: any)=>{
     this.event = data;
   })
 }

 
 logOn(){
  this.cookieService.deleteAll();
  this.cookieService.deleteAll('token', '/');

  localStorage.clear();
  location.href = 'login'
}

}

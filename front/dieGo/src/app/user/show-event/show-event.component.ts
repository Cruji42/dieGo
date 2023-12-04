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
  id_event
  event

  constructor(private usersService: UserService, private cookieService: CookieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_event = this.route.snapshot.paramMap.get('id');
    this.token = this.cookieService.get('token');
    this.id_user = this.cookieService.get("id");
    if(this.token) {
      this.flag = true;
      this.getEvenInfo();
    } else{
      this.getPublicEvenInfo();
    }
  }

  goToPage(page){
    location.href= page
  }

  getEvenInfo(){
     this.usersService.getEvent(this.token, this.id_event).subscribe((data: any)=>{
      this.event = data;
      console.log(data)
    })
  }

  getPublicEvenInfo(){
    this.usersService.getPublicEvent(this.token, this.id_event).subscribe((data: any)=>{
     this.event = data;
     console.log(data)
   })
 }

}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  copy: boolean;

  constructor(private adminService: AdminService, private userService: UserService, private cookieService: CookieService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.token = this.cookieService.get('token_log');
    this.role = this.cookieService.get('role')
    this.id_user = this.cookieService.get("id");

    if(!this.token || this.role !== 'admin' ){ location.href= 'home';} 
    this.getEvents()
    this.UserData()


  }


  getEvents(){
    this.adminService.getAllEvents(this.token).subscribe((data: any) => {
      this.events = data;
    })
  }

  UserData(){
    this.userService.getDataUser(this.token,this.id_user).subscribe((data: any) => {
      this.user = data;
    })
  }


  copyText(id){
    let url = location.origin
    console.log(url);
    let val = url + '/dieGO/show-event/' + id;
    console.log(val);
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      this.copy = true;
      this.openSnackBar('Link copiado');
      setTimeout(()=>{
        this.copy = false;
      }, 2000)
    }


    openSnackBar(label) {
      this._snackBar.open(label, 'Cerrar', {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
    }

  logOn(){
    this.cookieService.deleteAll();
    this.cookieService.deleteAll('token', '/');
  
    localStorage.clear();
    location.href = 'login'
  }

  goToPage(page){
    location.href= page
  }

  showEvent(id){

    console.log(location);
    location.href= 'show-event/'+id
  }
}

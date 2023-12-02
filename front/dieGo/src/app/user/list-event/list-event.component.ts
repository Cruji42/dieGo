import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {

  events: any[];
  token;
  copy: boolean;
  id_user;
  

  constructor(private usersService: UserService, private cookieService: CookieService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('token');
    this.id_user = this.cookieService.get("id");

    if(!this.token) location.href= 'login';
    this.usersService.getActiveEvents(this.token).subscribe((data: any)=>{
      this.events = data;
      console.log(data)
    })
  }


  addToFavorite(){

  }



  copyText(id){
    let url = location.origin
    console.log(url);
    let val = url + '/show-event/' + id;
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
      this.openSnackBar();
      setTimeout(()=>{
        this.copy = false;
      }, 2000)
    }


    openSnackBar() {
      this._snackBar.open('Link Copiado', 'Cerrar', {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
    }

}

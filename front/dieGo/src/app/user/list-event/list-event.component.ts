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
  flag: boolean;
  role;
  user;
  

  constructor(private userService: UserService, private cookieService: CookieService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('token_log');
    this.id_user = this.cookieService.get("id");
    this.role = this.cookieService.get('role')

    if(!this.token){ location.href= 'home';} else { 
      this.flag = true
      console.log(this.flag)
    }
    this.userService.getActiveEvents(this.token).subscribe((data: any)=>{
      this.events = data;
      this.events.forEach((element, index)=>{
        let date = element.start_date.toString();
        this.events[index].hour= date.slice(11,16);
      })
      console.log(data)
    })

    this.UserData()
  }


  goToPage(page){
    location.href= page
  }

  addToFavorite(id){

    this.userService.AddEventsToFavorite(this.token, id, this.id_user).subscribe((data: any) => {
      if(!data.error) this.openSnackBar('Agregado a Favoritos');
    })

  }

  
  logOn(){
    this.cookieService.deleteAll();
    this.cookieService.deleteAll('token', '/');
  
    localStorage.clear();
    location.href = 'login'
  }


  copyText(id){
    let url = location.origin
    console.log(url);
    let val = url + '/dieGo/show-event/' + id;
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

    showEvent(id){
      // localStorage.setItem('id_event', id);
      location.href= 'show-event/'+id
    }

  
  UserData(){
    this.userService.getDataUser(this.token,this.id_user).subscribe((data: any) => {
      this.user = data;
    })
  }

}

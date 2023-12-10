import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-favorite-event',
  templateUrl: './list-favorite-event.component.html',
  styleUrls: ['./list-favorite-event.component.css']
})
export class ListFavoriteEventComponent implements OnInit {

  events: any[];
  token;
  copy: boolean;
  id_user;
  flag: boolean;
  role;
  user

  constructor(private userService: UserService, private cookieService: CookieService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.token = this.cookieService.get('token_log');
    this.id_user = this.cookieService.get("id");
    this.role = this.cookieService.get('role')

    if(!this.token){ location.href= 'home';} else { this.flag = true 
      console.log(this.flag)}
    this.FavoriteEventData();
    this.UserData()
  }

  goToPage(page){
    location.href= page
  }


  
  UserData(){
    this.userService.getDataUser(this.token,this.id_user).subscribe((data: any) => {
      this.user = data;
    })
  }

  FavoriteEventData(){
     this.userService.getFavoriteEvent(this.token, this.id_user).subscribe((data: any)=>{
      this.events = data;
      console.log(data)
    })
  }


  deleteToFavorite(id, title){
     this.userService.deleteFavoriteEvent(this.token,id, this.id_user).subscribe((data: any)=> {
      console.log(data);
      if(!data.error){
         this.openSnackBar('Se elimino el evento "'+ title +'" de tus favoritos');
         this.FavoriteEventData();
      }
     })
  }

  gotoEditEvent(data){
     localStorage.setItem('update_event', data);
     location.href='edit_event'
  }


  openSnackBar(label) {
    this._snackBar.open(label, 'Cerrar', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
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


    logOn(){
      this.cookieService.deleteAll();
      this.cookieService.deleteAll('token', '/');
    
      localStorage.clear();
      location.href = 'login'
    }

    showEvent(id){
      // localStorage.setItem('id_event', id);
      location.href= 'show-event/'+id
    }
}

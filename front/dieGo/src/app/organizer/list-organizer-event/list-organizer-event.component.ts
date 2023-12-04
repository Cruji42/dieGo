import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../organizer.service';
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-organizer-event',
  templateUrl: './list-organizer-event.component.html',
  styleUrls: ['./list-organizer-event.component.css']
})
export class ListOrganizerEventComponent implements OnInit {

  events: any[];
  token;
  copy: boolean;
  id_user;
  flag: boolean;

  constructor(private organizerService: OrganizerService, private cookieService: CookieService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('token');
    this.id_user = this.cookieService.get("id");

    if(!this.token){ location.href= 'login';} else { this.flag = true}
    this.listOrganizerEvent()
  }


  listOrganizerEvent(){
    this.organizerService.getEventOrganizer(this.token, this.id_user).subscribe((data: any) => {
      this.events = data;
      console.log(data)
    })
  }


  edit(e){
    console.log(e);
    localStorage.setItem('edit_event_data', JSON.stringify(e));
    location.href= 'edit-event';
   
  }


  delete(id){
    this.organizerService.deleteEvent(this.token, id ).subscribe((data: any) =>{
      console.log(data);
      if(!data.error){
         this.openSnackBar('Evento borrado ')
         this.listOrganizerEvent();
      }
    }, error => {
      this.openSnackBar(error.error.message)
    })
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

}

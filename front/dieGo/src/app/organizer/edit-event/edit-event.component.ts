import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { OrganizerService } from '../organizer.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  eventForm: FormGroup;
  token;
  id_user;
  flag: boolean;
  event_data;

  constructor(private organizerService: OrganizerService, private cookieService: CookieService, private _snackBar: MatSnackBar) {
 
   }

   minDate = new Date().toISOString().slice(0, -8);

  ngOnInit(): void {

    this.token = this.cookieService.get('token');
    this.id_user = this.cookieService.get("id");

    this.event_data = JSON.parse(localStorage.getItem('edit_event_data'));
    if(!this.event_data) location.href = 'home'
    this.event_data.start_date = new Date(this.event_data.start_date).toISOString().slice(0, -8);
    this.event_data.end_date = new Date(this.event_data.end_date).toISOString().slice(0, -8);

    this.eventForm = new FormGroup({
      title: new FormControl(this.event_data.title, [Validators.required]),
      subtitle: new FormControl(this.event_data.subtitle, [Validators.required]),
      partner: new FormControl(this.event_data.partner, [Validators.required]),
      location: new FormControl(this.event_data.location, [Validators.required]),
      description: new FormControl(this.event_data.description, [Validators.required]),
      dress_code: new FormControl(this.event_data.dress_code, [Validators.required]),
      price: new FormControl(this.event_data.price, [Validators.required]),
      start_date: new FormControl(this.event_data.start_date, [Validators.required]),
      end_date: new FormControl(this.event_data.end_date, [Validators.required]),
    });

    if(!this.token){ location.href= 'login';} else { this.flag = true}
  }

  editEvent(){

    let e = this.eventForm.controls;
    let data_event = {
      title: e.title.value,
      subtitle: e.subtitle.value,
      partner: e.partner.value,
      location: e.location.value,
      description: e.description.value,
      dress_code: e.dress_code.value,
      price: e.price.value,
      start_date: e.start_date.value,
      end_date: e.end_date.value,
      event_date: e.start_date.value,
      disabled: false,
      image: 'assets/img/png/no-image.png',
      user_id: this.id_user

    }
    this.organizerService.editEvent(this.token,data_event, this.event_data.event_id).subscribe((data: any) => {
      if(!data.error){
        localStorage.removeItem('edit_event_data')
        location.href='list-organizer-events';
      }
    })

    }

    Cancel(){
      localStorage.removeItem('edit_event_data')
      location.href='list-organizer-events';
    }
  

}

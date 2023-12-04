import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { OrganizerService } from '../organizer.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent implements OnInit {

  eventForm: FormGroup;
  token;
  id_user;
  flag: boolean;

  constructor( private organizerService: OrganizerService, private cookieService: CookieService, private _snackBar: MatSnackBar) { 
    this.eventForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      subtitle: new FormControl(null, [Validators.required]),
      partner: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      dress_code: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      start_date: new FormControl(null, [Validators.required]),
      end_date: new FormControl(null, [Validators.required]),
    });
  }

  minDate = new Date().toISOString().slice(0, -8);

  ngOnInit(): void {

    this.token = this.cookieService.get('token');
    this.id_user = this.cookieService.get("id");

    if(!this.token){ location.href= 'login';} else { this.flag = true}
  }


  createEvent(){
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
    this.organizerService.addEvent(this.token, this.id_user,  data_event).subscribe((data: any) => {
      console.log(data);
      if(!data.error){
         this.openSnackBar('El evento se publico exitosamente')
         this.eventForm.reset();
      }
    }, error =>{
      this.openSnackBar(error.error.message)
    }
    )
  }


  openSnackBar(label) {
    this._snackBar.open(label, 'Cerrar', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }



}

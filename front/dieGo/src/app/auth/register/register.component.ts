import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../error/error.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  maxDate = new Date();
  token;

  constructor( public dialog: MatDialog, private cookieService: CookieService) {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      birth_day: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      phone_number: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
   }

  ngOnInit(): void {
    this. token = this.cookieService.get('token');
    if(this.token) location.href ='home'
    
  }


  openErrorDialog( info): void {
    const dialogRef = this.dialog.open(ErrorComponent, {data: {message: info}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }




  register(){
    let f = this.registerForm.controls
    if( f.confirmPassword.value === f.password.value ){
      let userData = {
        name: f.name.value,
        last_name: f.last_name.value,
        email: f.email.value,
        password: f.password.value,
        birth_day: f.birth_day.value,
        genre: f.genre.value,
        disable: false,
        phone_number: f.phone_number.value,
        picture: "assets/img/png/no-image.png"
      }
      localStorage.setItem('userData', JSON.stringify(userData));
      location.href = 'welcome';
    
    } else {
      this.openErrorDialog("Las contraseñas no coinciden, favor de verificar");
    }

  
  }

  goToPage(page){
    location.href = page
  }
}

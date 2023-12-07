import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userForm: FormGroup;

  maxDate = new Date();
  
  flag: boolean;
  token;
  id_user;
  user;
  role;


  constructor(private cookieService: CookieService, private usersService: UserService,private _snackBar: MatSnackBar) { 


  }



  ngOnInit(): void {

    

    this.token = this.cookieService.get('token');
    this.id_user = this.cookieService.get("id");
    this.role = this.cookieService.get('role')

   
    this.getDataUser();
   

    if(!this.token){ location.href= 'home';} else { this.flag = true}
  }

 getDataUser(){
  this.usersService.getDataUser(this.token, this.id_user).subscribe((data: any) => {
    this.user = data;
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      last_name: new FormControl(this.user.last_name, [Validators.required]),
      birth_day: new FormControl(this.user.birth_day, [Validators.required]),
      genre: new FormControl(this.user.genre, [Validators.required]),
      phone_number: new FormControl(this.user.phone_number, [Validators.required]),
    });
    console.log(data.name)

  }, error =>{
    // location.href = 'home';
  })
 }

 goToPage(page){
  location.href= page
}


 Editar(){
  let f = this.userForm.controls;
  let userData = {
    user_id: this.id_user,
    name: f.name.value,
    last_name: f.last_name.value,
    email: this.user.email,
    password: this.user.password,
    birth_day: f.birth_day.value,
    genre: f.genre.value,
    disable: false,
    phone_number: f.phone_number.value,
    picture: "assets/img/png/no-image.png"
  }

  this.usersService.editUserData(this.token, userData).subscribe((data: any)=> {
    if(!data.error){
      this.getDataUser();
      this.openSnackBar('Editado correctamente')
    }
  })
 }


 logOn(){
  this.cookieService.deleteAll();
  this.cookieService.deleteAll('token', '/');

  localStorage.clear();
  location.href = 'login'
}

openSnackBar(label) {
  this._snackBar.open(label, 'Cerrar', {
    horizontalPosition: 'start',
    verticalPosition: 'bottom',
  });
}


}

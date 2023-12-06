import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgetComponent } from '../forget/forget.component';
import { ErrorComponent } from '../error/error.component';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  token;



  constructor(public dialog: MatDialog, private authSevice: AuthService, private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
    
   }

  ngOnInit(): void {
    this. token = this.cookieService.get('token');
    if(this.token) location.href ='home'

  }



  openForgetDialog(): void {
    const dialogRef = this.dialog.open(ForgetComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openErrorDialog( info): void {
    const dialogRef = this.dialog.open(ErrorComponent, {data: {message: info}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

   login(){
    this.authSevice.login(
      {
        email: this.loginForm.controls.email.value, 
        password: this.loginForm.controls.password.value}).subscribe((data: any) =>{
          console.log(data.token);
          let token = data.token;
          if (data.message = "Loged"){
              document.cookie = " token=" + token
              document.cookie = " id=" + data.id
              document.cookie = " role=" +data.role
             location.href = 'home';
          }
        }, error =>{
          console.log(error);
          this.openErrorDialog(error.error.message);
        });
   
  }


  goToPage(page){
    location.href = page
  }

}

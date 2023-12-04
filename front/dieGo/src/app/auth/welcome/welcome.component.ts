import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorComponent } from '../error/error.component';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  userData = JSON.parse(localStorage.getItem('userData'));
  token;
  constructor( private authService: AuthService, public dialog: MatDialog, private cookieService: CookieService) { }

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

  selectRole(role){
    switch(role){
      case 'visitor':
        this.userData.role = role;
        console.log(this.userData);
        this.onRegister();
        break;
      case 'organizer':
        this.userData.role = role;
        console.log(this.userData);
        this.onRegister();
        break;
    }
  }

  onRegister(){
    this.authService.register(this.userData).subscribe((data: any)=> {
      if(!data.error){
        this.authService.login({ 
          email: this.userData.email, 
          password: this.userData.password
        }).subscribe((res: any ) => {
          console.log(res.token);
          let token = res.token;
          if (res.message = "Loged"){
              document.cookie = " token=" + token
              localStorage.removeItem('userData');
             location.href = 'home';
          }
        }, error => {
          console.log(error);
          this.openErrorDialog(error.error.message);
        })
      }
    }, error =>{

      console.log(error);
      this.openErrorDialog(error.error.message);

    })
  }

}


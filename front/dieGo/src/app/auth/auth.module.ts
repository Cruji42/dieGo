import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ForgetComponent } from './forget/forget.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule
    // AuthService
  ],

})
export class AuthModule { }

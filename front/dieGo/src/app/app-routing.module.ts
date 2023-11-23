import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { HomeComponent } from './user/home/home.component';
import { ContactComponent } from './user/contact/contact.component';

const routes: Routes = [
   { path: '', component: HomeComponent},
   { path: 'login', component: LoginComponent},
   { path: 'register', component: RegisterComponent},
   { path: 'welcome', component: WelcomeComponent},
   { path: 'home', component: HomeComponent},
   { path: 'contact', component: ContactComponent}

];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

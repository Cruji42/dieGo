import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { HomeComponent } from './user/home/home.component';
import { ContactComponent } from './user/contact/contact.component';
import { ProfilComponent } from './user/profil/profil.component';
import { SavedEventsComponent } from './user/saved-events/saved-events.component';
import { AddEventsComponent } from './organizer/add-events/add-events.component';
import { ShowEventComponent } from './user/show-event/show-event.component';
import { CharsComponent } from './admin/chars/chars.component';
import { ListEventComponent } from './user/list-event/list-event.component';

const routes: Routes = [
   { path: '', component: HomeComponent},
   { path: 'login', component: LoginComponent},
   { path: 'register', component: RegisterComponent},
   { path: 'welcome', component: WelcomeComponent},
   { path: 'home', component: HomeComponent},
   { path: 'contact', component: ContactComponent},
   { path: 'profile', component: ProfilComponent},
   { path: 'saved-events', component: SavedEventsComponent},
   { path: 'add-events', component: AddEventsComponent},
   { path: 'show-event/:id', component: ShowEventComponent},
   { path: 'chars', component: CharsComponent},
   { path: 'list-events', component: ListEventComponent}

];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

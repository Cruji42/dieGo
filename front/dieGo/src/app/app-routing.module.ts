import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { HomeComponent } from './user/home/home.component';
import { ContactComponent } from './user/contact/contact.component';
import { ProfilComponent } from './user/profil/profil.component';
import { AddEventsComponent } from './organizer/add-events/add-events.component';
import { ShowEventComponent } from './user/show-event/show-event.component';
import { ChartsComponent } from './admin/chars/charts.component';
import { ListEventComponent } from './user/list-event/list-event.component';
import { ListFavoriteEventComponent } from './user/list-favorite-event/list-favorite-event.component';
import { ListOrganizerEventComponent } from './organizer/list-organizer-event/list-organizer-event.component';
import { EditEventComponent } from './organizer/edit-event/edit-event.component';
import { AllEventsComponent } from './admin/all-events/all-events.component';

const routes: Routes = [
   { path: '', component: HomeComponent},
   { path: 'login', component: LoginComponent},
   { path: 'register', component: RegisterComponent},
   { path: 'welcome', component: WelcomeComponent},
   { path: 'home', component: HomeComponent},
   { path: 'contact', component: ContactComponent},
   { path: 'profile', component: ProfilComponent},
   { path: 'add-events', component: AddEventsComponent},
   { path: 'show-event', component: ShowEventComponent},
   { path: 'charts', component: ChartsComponent},
   { path: 'list-events', component: ListEventComponent},
   { path: 'list-favorite-events', component: ListFavoriteEventComponent},
   { path: 'list-organizer-events', component: ListOrganizerEventComponent},
   { path: 'edit-event', component: EditEventComponent},
   { path: 'all-events', component: AllEventsComponent}

];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

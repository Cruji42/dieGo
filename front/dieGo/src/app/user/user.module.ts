import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCarouselModule } from 'ng-mat-carousel';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ContactComponent } from './contact/contact.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProfilComponent } from './profil/profil.component';
import { SavedEventsComponent } from './saved-events/saved-events.component';
import { ShowEventComponent } from './show-event/show-event.component';
import { CookieService } from 'ngx-cookie-service';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { ListEventComponent } from './list-event/list-event.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    ProfilComponent,
    SavedEventsComponent,
    ShowEventComponent,
    ListEventComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCarouselModule.forRoot(),
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    HttpClientModule,
    MatTooltipModule,
    MatSnackBarModule
  ], 
  providers: [CookieService, UserService]
})
export class UserModule { }

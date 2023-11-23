import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCarouselModule } from 'ng-mat-carousel';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCarouselModule.forRoot(),
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UserModule { }

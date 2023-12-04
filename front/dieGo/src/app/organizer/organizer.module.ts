import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEventsComponent } from './add-events/add-events.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { OrganizerService } from './organizer.service';
import { MatMenuModule } from '@angular/material/menu';
import { ListOrganizerEventComponent } from './list-organizer-event/list-organizer-event.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EditEventComponent } from './edit-event/edit-event.component';



@NgModule({
  declarations: [
    AddEventsComponent,
    ListOrganizerEventComponent,
    EditEventComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule, 
    MatTooltipModule

  ],
  providers: [ OrganizerService]
})
export class OrganizerModule { }

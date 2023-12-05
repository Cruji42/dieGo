import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ChartsComponent } from './chars/charts.component';
import { AllEventsComponent } from './all-events/all-events.component';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsModule } from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { AdminService } from './admin.service';
import { UserService } from '../user/user.service';





@NgModule({
  declarations: [
    ChartsComponent,
    AllEventsComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatStepperModule,
    NgApexchartsModule,
    ChartsModule,
    GoogleChartsModule,
  ],
  providers: [
    AdminService,
    UserService
  ]
})
export class AdminModule { }

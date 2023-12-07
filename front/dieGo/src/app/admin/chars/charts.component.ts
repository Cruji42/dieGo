import { Component, OnInit , ViewChild} from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

import { BaseChartDirective } from 'ng2-charts';
import { AdminService } from '../admin.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';
import { interval } from 'rxjs/internal/observable/interval';
import { UserService } from 'src/app/user/user.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @ViewChild("chart2") chart2: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  token;
  chartData;
  chartLabels ;
  chartOptions2;

  total_events =  [ 
    { "month": "Enero",  "total": 0},
    { "month": "Febrero",  "total": 0},
    { "month": "Marzo", "total": 0},
    { "month": "Abril", "total": 0},
    { "month": "Mayo",  "total": 0},
    { "month": "Junio",  "total": 0},
    { "month": "Julio", "total": 0},
    { "month": "Agosto",  "total": 0},
    { "month": "Septiembre",  "total": 0},
    { "month": "Octubre", "total": 0},
    { "month": "Noviembre",  "total": 0},
    { "month": "Diciembre",  "total": 0},
  ];
  total_users =  [ 
    { "month": "Enero",  "total": 0, "total_f": 0, "total_m": 0},
    { "month": "Febrero",  "total": 0, "total_f": 0, "total_m": 0},
    { "month": "Marzo", "total": 0, "total_f": 0, "total_m": 0},
    { "month": "Abril", "total": 0, "total_f": 0, "total_m": 0},
    { "month": "Mayo",  "total": 0, "total_f": 0, "total_m": 0},
    { "month": "Junio",  "total": 0, "total_f": 0, "total_m": 0},
    { "month": "Julio", "total": 0, "total_f": 0, "total_m": 0},
    { "month": "Agosto",  "total": 0, "total_f": 0, "total_m": 0},
    { "month": "Septiembre",  "total": 0, "total_f": 0, "total_m": 0},
    { "month": "Octubre", "total": 0, "total_f": 0, "total_m": 0},
    { "month": "Noviembre",  "total": 0, "total_f": 0, "total_m": 0},
    { "month": "Diciembre",  "total": 0, "total_f": 0, "total_m": 0},
  ]

  topFiveEvents = [{ "title": "",  "total": 0},
  { "title": "",  "total": 0},
  { "title": "",  "total": 0},
  { "title": "",  "total": 0},
  {"title": "",  "total": 0}
]

  title = 'Top 5 Eventos';
  type = 'PieChart';
  data = [];
  columnNames = ['titulo', 'Popularidad'];
  options = {
    
 };
  // width = ;
  // height = 400;
  sub;
  role;
  id_user;
  user;
 

  constructor(private adminService: AdminService, private userService: UserService, private cookieService: CookieService) { 

    this.sub = interval(5000)
    .subscribe((val) => { 
      this.getEventDataByMonth()
      this.getUsersDtaByMonth()
      this.getTopFiveEvents()
    });
  }

  
  

  ngOnInit(): void {

    this.token = this.cookieService.get('token');
    this.role = this.cookieService.get('role')
    this.id_user = this.cookieService.get("id");
    if(!this.token || this.role !== 'admin' ){ location.href= 'home';} 
    this.getEventDataByMonth()
    this.getUsersDtaByMonth()
    this.getTopFiveEvents()
    this.UserData()

  }


  UserData(){
    this.userService.getDataUser(this.token,this.id_user).subscribe((data: any) => {
      this.user = data;
    })
  }


  logOn(){
    this.cookieService.deleteAll();
    this.cookieService.deleteAll('token', '/');
  
    localStorage.clear();
    location.href = 'login'
  }

  goToPage(page){
    location.href= page
  }


  // Primer grafica

  getEventDataByMonth(){
    this.adminService.getEventsBytMonth(this.token).subscribe( (data) => {
      this.makeArrayMonthEvents(data);

      this.chartOptions = {
        series: [
          {
            name: "Events",
            data: [
              this.total_events[0].total, 
              this.total_events[1].total, 
              this.total_events[2].total,
              this.total_events[3].total,
              this.total_events[4].total,
              this.total_events[5].total,
              this.total_events[6].total,
              this.total_events[7].total,
              this.total_events[8].total,
              this.total_events[9].total,
              this.total_events[10].total,
              this.total_events[11].total,
              ]
          }
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Eventos registrados por mes",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [
            this.total_events[0].month,
            this.total_events[1].month,
            this.total_events[2].month,
            this.total_events[3].month,
            this.total_events[4].month,
            this.total_events[5].month,
            this.total_events[6].month,
            this.total_events[7].month,
            this.total_events[8].month,
            this.total_events[9].month,
            this.total_events[10].month,
            this.total_events[11].month,
          ]
        }
      };
    })
  }

  makeArrayMonthEvents(data){
    data.forEach(element => {
    this.total_events[element.mes - 1].total = element.total_events
    });
    
  }

  // segunda grafica

  getUsersDtaByMonth(){
    this.adminService.getUserBytMonth(this.token).subscribe((data: any) => {
      this.makeArrayMonthUsers(data);
      this.adminService.getFemaleUserBytMonth(this.token).subscribe((data2: any) => {
        this.makeArrayMonthUsersF(data2);
        this.adminService.getMaleUserBytMonth(this.token).subscribe((data3: any) => {
          this.makeArrayMonthUsersM(data3);
            this.chartData = [
            {
              data: [
                this.total_users[0].total,
                this.total_users[1].total,
                this.total_users[2].total,
                this.total_users[3].total,
                this.total_users[4].total,
                this.total_users[5].total,
                this.total_users[6].total,
                this.total_users[7].total,
                this.total_users[8].total,
                this.total_users[9].total,
                this.total_users[10].total,
                this.total_users[11].total,
              ],
              label: 'Total de usuarios registrados'
            },
            {
              data: [
                this.total_users[0].total_f,
              this.total_users[1].total_f,
              this.total_users[2].total_f,
              this.total_users[3].total_f,
              this.total_users[4].total_f,
              this.total_users[5].total_f,
              this.total_users[6].total_f,
              this.total_users[7].total_f,
              this.total_users[8].total_f,
              this.total_users[9].total_f,
              this.total_users[10].total_f,
              this.total_users[11].total_f,
            ],
              label: 'Total de usuarios femeninos registrados'
            },
            {
              data: [
                this.total_users[0].total_m,
              this.total_users[1].total_m,
              this.total_users[2].total_m,
              this.total_users[3].total_m,
              this.total_users[4].total_m,
              this.total_users[5].total_m,
              this.total_users[6].total_m,
              this.total_users[7].total_m,
              this.total_users[8].total_m,
              this.total_users[9].total_m,
              this.total_users[10].total_m,
              this.total_users[11].total_m
              ],
              label: 'Total de usuarios masculinos registrados'
            }
          ];
        
          this.chartLabels = [
            this.total_users[0].month,
              this.total_users[1].month,
              this.total_users[2].month,
              this.total_users[3].month,
              this.total_users[4].month,
              this.total_users[5].month,
              this.total_users[6].month,
              this.total_users[7].month,
              this.total_users[8].month,
              this.total_users[9].month,
              this.total_users[10].month,
              this.total_users[11].month
          ];
        
          this.chartOptions2 = {
            responsive: true
          };

        })
      })
    })
  }

  makeArrayMonthUsers(data){
    data.forEach(element => {
    this.total_users[element.mes - 1].total = element.total_users
    });
    
  }

  makeArrayMonthUsersF(data){
    data.forEach(element => {
    this.total_users[element.mes - 1].total_f = element.total_users
    });
    
  }

  makeArrayMonthUsersM(data){
    data.forEach(element => {
    this.total_users[element.mes - 1].total_m = element.total_users
    });
    
  }

  // tercer grafica 

  getTopFiveEvents(){
    this.adminService.getTopEvent(this.token).subscribe((res: any) => {
     this.makeArrayTopFiveEvents(res);
     this.data = [
      [ this.topFiveEvents[0].title, this.topFiveEvents[0].total],
      [ this.topFiveEvents[1].title, this.topFiveEvents[1].total],
      [ this.topFiveEvents[2].title, this.topFiveEvents[2].total],
      [ this.topFiveEvents[3].title, this.topFiveEvents[3].total],
      [ this.topFiveEvents[4].title, this.topFiveEvents[4].total]
     ]
    })
  }


  makeArrayTopFiveEvents(data){
    data.forEach((element, i)=> {
      this.topFiveEvents[i].total = element.total;
      let string_title = element.title.split(',')
      this.topFiveEvents[i].title = string_title[0];
    })
    
  }


}

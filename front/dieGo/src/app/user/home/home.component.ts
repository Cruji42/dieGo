import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  slides = [
    {"image": "assets/img/png/no-image.png"},
    {"image": "assets/img/png/no-image.png"},
    {"image": "assets/img/png/no-image.png"}
   ]

  ngOnInit(): void {
  }

}

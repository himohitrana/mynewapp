import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Init } from 'src/app/models/Init.model';
import { CarreraService } from 'src/app/services/carrera.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  races = [];

  userData: Init;
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };

  constructor(private carreraService: CarreraService) {}

  ngOnInit(): void {
    let jsonObj: any = JSON.parse(localStorage.getItem('userData')); 
    this.userData = <Init>jsonObj;
    this.onFetchNextRaces();
  }

  slickInit(e) {
  }

  breakpoint(e) {
  }

  afterChange(e) {
  }

  beforeChange(e) {
  }

  public onFetchNextRaces() {
      this.carreraService.nextRacesList.subscribe((response) => {
        this.races = response;
      });
  }
  
}

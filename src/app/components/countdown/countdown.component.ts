import { Component, Input, OnInit } from '@angular/core';
import { Init } from 'src/app/models/Init.model';
import { CarreraService } from 'src/app/services/carrera.service';

function delay(delay: number) {
  return new Promise((r) => {
    setTimeout(r, delay);
  });
}
@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css'],
})
export class CountdownComponent implements OnInit {
  @Input() raceDate: Date;
  public minutes: number;
  public counter: number = 1440;
  userData: Init;

  constructor(private carreraService: CarreraService) {}

  ngOnInit(): void {
    let jsonObj: any = JSON.parse(localStorage.getItem('userData')); 
    this.userData = <Init>jsonObj;
    this.doTimer();
  }

  ISODate(date: any) {
    var b = date.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  onFetchNextRaces(): void {
    this.carreraService.processingNextRacesByAgentAndPagination(this.userData.AgenteID,10);
  }
  async doTimer() {
    for (let i = 0; i < this.counter; i++) {
      let strDate = this.ISODate(this.raceDate);
      let countDownDate = new Date(strDate).getTime();
      let now = new Date().getTime();
      let distance = now - countDownDate;
      const mins = Math.floor(distance / 1000 / 60);
      
      this.minutes = mins;
      
      if (distance <= 0) {
        this.onFetchNextRaces();
      }
      
      await delay(60000);
    }
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-horse-racing',
  templateUrl: './horse-racing.component.html',
  styleUrls: ['./horse-racing.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HorseRacingComponent implements OnInit {
  titleWelcome: string;
  addClassToBgBody: string;
  public borders = [
    'border-primary',
    'border-secondary',
    'border-danger',
    'border-success',
    'border-warning',
  ];

  constructor(private http: HttpClient, private router: Router) {
   
  }


  ngOnInit(): void {
    this.addClassToBgBody = $('body').addClass('theme-hipodromo');
    let bgNumber = [
      'rk-red',
      'rk-white',
      'rk-blue',
      'rk-yellow',
      'rk-green',
      'rk-black',
      'rk-orange',
      'rk-gray',
      'rk-magenta',
      'rk-blueviolet',
      'rk-springgreen',
      'rk-mediumblue',
      'rk-chocolate',
    ];
    // $('.round-number').addClass(randBgNumber);
    $('.round-number').each(function (index, el) {
      const randBgNumber =
        bgNumber[Math.floor(Math.random() * bgNumber.length)];
      $(this).addClass(randBgNumber);
      bgNumber = $.grep(bgNumber, (value) => {
        return value !== randBgNumber;
      });
    });
  }
}

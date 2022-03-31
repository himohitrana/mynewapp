import { Component, OnInit } from '@angular/core';
import { Init } from 'src/app/models/Init.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  userData: Init;
  div1: boolean = true;
  constructor(
    public userService: UserService
  ) {
    let jsonObj: any = JSON.parse(localStorage.getItem('userData'));
    this.userData = <Init>jsonObj;
  }


  div1Function() {
    this.div1 = this.div1 ? false : true;
    // console.log(.div1);
    this.userService.shareValue(this.div1);
  }

  ngOnInit(): void {
  }

}

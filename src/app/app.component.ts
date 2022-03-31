import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app-horseracing';
  collapsed = true;
  LinkDemoHorseRacing = false;
  private user: string;
  private banca: string;
  public div2: boolean;
  constructor(
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let th = this;
    this.route.queryParams.subscribe((params) => {
      //console.log(params);
      this.user = params.user;
      this.banca = params.banca;
      if (this.user !== undefined && this.banca !== undefined)
        this.getUserInfo(this.user, this.banca);
    });
    this.userService.content.subscribe((data) => {
      this.div2 = data;
    });
    // this.SpinnerService.show();
    // this.checkRouteForDemo()
  }

  getUserInfo(user: string, banca: string) {
    this.userService.getUserData(user, banca).subscribe((data) => {
      localStorage.setItem('userData', JSON.stringify(data));
    });
  }

  checkRouteForDemo() {
    //console.log(this.router.url)
    // return this.router.url === '/template-web/horse-racing';
  }
}

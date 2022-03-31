import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public data = new BehaviorSubject<any>(true);
  public content = this.data.asObservable();

  SERVER_URL: string = environment.URL_API;
  
  constructor(private http: HttpClient) {}

  public getUserData(user:string,banca:string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/APITest/User/${user}/${banca}`);
  }

  shareValue(value) {
    this.data.next(value);
    // console.log('fds',value);
  }
}

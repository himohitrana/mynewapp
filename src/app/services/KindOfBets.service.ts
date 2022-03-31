import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { TipoApuesta } from '../models/tipoApuesta.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KindOfBetsService {

  SERVER_URL: string = environment.URL_API;
  kindOfBetsResource = 'TipoApuesta';
  constructor(private http: HttpClient) {}

  getKindsOfBets(): Observable<TipoApuesta[]> {
    return this.http.get<TipoApuesta[]>(
      `${this.SERVER_URL}/${this.kindOfBetsResource}`
    );
  }

  
  getDefaultKindsOfBets(): string[] {
    return ['00fe01a93220a22764301f949c51b04ef067d2c8ab2b15e9aa07e5b98fd27d5b', '4c323e8ebc0b0ffbd970817cd00b09ed7a34fe870c38ec18bf9682e18a93c799', '4c323e8ebc0b0ffbd970817cd00b09e90rt0f0fdg0c38ec18bf9682e18a93c799'];
  }
}

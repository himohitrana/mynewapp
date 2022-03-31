import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carrera } from 'src/app/models/carrera.model';
import { Hipodromo } from 'src/app/models/hipodromo.model';
import { Ticket } from '../models/ticket.model';
import { TipoApuesta } from '../models/tipoApuesta.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageReturn } from '../models/messageReturn.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  SERVER_URL: string = environment.URL_API;
  ticketResource: string = 'Ticket';
  public hipodromo = new BehaviorSubject<any>('');
  public hipodromo$ = this.hipodromo.asObservable();

  public carrera = new BehaviorSubject<any>('');
  public carrera$ = this.carrera.asObservable();

  public tipoApuesta = new BehaviorSubject<any>('');
  public tipoApuesta$ = this.tipoApuesta.asObservable();

  public valorApuesta = new BehaviorSubject<any>('');
  public valorApuesta$ = this.valorApuesta.asObservable();

  public seleccionados = new BehaviorSubject<any[]>([]);
  public seleccionados$ = this.seleccionados.asObservable();

  constructor(private http: HttpClient) {}

  addHipodromoToTicketDetail(hipodromo: Hipodromo): void {
    this.hipodromo.next(hipodromo);
  }

  addCarreraToTicketDetail(carrera: Carrera): void {
    this.carrera.next(carrera);
  }

  addTipoApuestaToTicketDetail(tipoApuesta: TipoApuesta): void {
    this.tipoApuesta.next(tipoApuesta);
  }

  addValorApuestaToTicketDetail(valorApuesta: number): void {
    this.valorApuesta.next(valorApuesta);
  }
  onSubmitTicket(ticket: Ticket): Promise<MessageReturn> {
    return this.http.post(`${this.SERVER_URL}/${this.ticketResource}`, ticket).toPromise()
      .then(function (result) {
        console.error(result)
        return this.extractData(result);
      }.bind(this))
      .catch(function (result) {
        console.error(result)
        return this.extractData(result);
      });
  }
  extractData(res: Response) {
    let body = res.json();
    return body; 
  }
}

import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ShareService } from 'ngx-sharebuttons';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Carrera } from 'src/app/models/carrera.model';
import { DetailSelected } from 'src/app/models/DetailSelected.model';
import { Hipodromo } from 'src/app/models/hipodromo.model';
import { Init } from 'src/app/models/Init.model';
import { Runners } from 'src/app/models/Runners.model';
import { TicketDetalle } from 'src/app/models/ticket-detalle.model';
import { Ticket } from 'src/app/models/ticket.model';
import { TipoApuesta } from 'src/app/models/tipoApuesta.model';
import { RaceTableService } from 'src/app/services/race-table.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
})
export class TicketDetailComponent implements OnInit {
  hipodromo: Hipodromo;
  carrera: Carrera;
  tipoApuesta: TipoApuesta;
  valorApuesta: number = 0;
  userData: Init;
  newTicketDetalle: {} = {};
  selectedDetailsItems: DetailSelected[] = [];
  selectedDetailsItemsDescription: string= '';
  horseDetails: string = '';
  isDisabledToActionsTicket: boolean = true;
  description: string;
  title: string;
  url: string;
  constructor(
    private ticketService: TicketService,
    private raceTableService: RaceTableService,
    private shareService: ShareService
  ) {}

  ngOnInit(): void {
    let jsonObj: any = JSON.parse(localStorage.getItem('userData'));
    this.userData = <Init>jsonObj;
    this.raceTableService.processingIsThereAnyFavorite();
    this.onGetTicketDetail();
    this.description = '2kwin.bet | Las apuestas donde mas ganas!!';
    this.title = '2kwin.bet | Las apuestas donde mas ganas!!';
    this.url = '2kwin.bet';
  }

  onGetTicketDetail(): void {
    this.ticketService.hipodromo$.subscribe((response) => {
      this.hipodromo = response;
    });
    this.ticketService.carrera$.subscribe((response) => {
      this.carrera = response;
    });
    this.ticketService.tipoApuesta$.subscribe((response) => {
      this.tipoApuesta = response;
    });
    this.ticketService.valorApuesta$.subscribe((response) => {
      this.valorApuesta = response;
    });
    this.raceTableService.favouritesList$.subscribe((response) => {
      this.selectedDetailsItems = response;
      this.processDetailDescription();
    });
    this.raceTableService.isThereAnyfavourite$.subscribe((response) => {
      this.isDisabledToActionsTicket = response;
      this.processDetailDescription();
    });
  }
  processDetailDescription() {
    let th=this;
    this.selectedDetailsItemsDescription ='';
    this.selectedDetailsItems.forEach(function (value, index) {
      if (index < 4) th.selectedDetailsItemsDescription += `${value.Number} (Pos. ${value.Index}) `;
      if (index == 4) th.selectedDetailsItemsDescription += '...';
    });
  }
  onShareTicket(): void {}
  onSaveTicket(): void {
    this.processingTicket(false);
  }
  onSubmitTicket(): void {
    this.processingTicket(true);
  }
  processingTicket(isSubmit: boolean) {
    let ticket: Ticket;
    let ticketDetalles: TicketDetalle[] = [];
    let ticketDetalle: TicketDetalle;
    let runners: Runners[];

    runners = this.selectedDetailsItems.map(function (runner) {
      return new Runners(runner.UID, runner.Index, runner.Number, false);
    });

    let numbers = runners
      .sort((a, b) => (a.Posicion > b.Posicion ? 1 : -1))
      .map((element) => element.Numero)
      .join('-');

    ticketDetalle = new TicketDetalle(
      this.carrera.UID,
      this.carrera.UID_Hipodromo,
      this.tipoApuesta.UID,
      numbers,
      this.userData.Amount,
      runners
    );

    ticketDetalles.push(ticketDetalle);
    ticket = new Ticket(
      this.userData.BancaID,
      this.userData.AgenteID,
      this.userData.User,
      50,
      this.tipoApuesta.UID,
      this.tipoApuesta.Nombre,
      this.userData.Amount,
      this.valorApuesta,
      isSubmit,
      ticketDetalles
    );
    console.error(ticket);
     this.ticketService.onSubmitTicket(ticket)
  }
}

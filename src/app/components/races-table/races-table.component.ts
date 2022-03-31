import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { CarreraDetalle } from 'src/app/models/carrera-detalle.model';
import { RaceTableService } from 'src/app/services/race-table.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Carrera } from 'src/app/models/carrera.model';
import { Init } from 'src/app/models/Init.model';
import { CarreraDetalleService } from 'src/app/services/carreraDetalle.service';
import { TipoApuesta } from 'src/app/models/tipoApuesta.model';
import { DetailSelected } from 'src/app/models/DetailSelected.model';
import { CarreraService } from 'src/app/services/carrera.service';

@Component({
  selector: 'app-races-table',
  templateUrl: './races-table.component.html',
  styleUrls: ['./races-table.component.css'],
})
export class RacesTableComponent implements OnInit {
  clicked: boolean;
  ColumnsOrigin: string[] = [
    'position',
    'odds',
    'pl',
    'runner-info',
    'jockey',
    'trainer',
    'sire',
  ];
  displayedColumns: string[] = [];

  dataSource: CarreraDetalle[];
  selection = new Set<CarreraDetalle>();
  carrera: Carrera;
  tipoApuesta: TipoApuesta;
  userData: Init;
  constructor(
    private carreraDetalleService: CarreraDetalleService,
    private raceTableService: RaceTableService,
    private ticketService: TicketService,
    private carreraService: CarreraService
  ) {}

  ngOnInit(): void {
    this.clicked = false;
    let jsonObj: any = JSON.parse(localStorage.getItem('userData'));
    this.userData = <Init>jsonObj;
    this.onGetCarrera();
    this.onGetKindOfBet();
    this.onFetchNextRaces();
  }
  onFetchNextRaces(): void {
    this.carreraService.processingNextRacesByAgentAndPagination(
      this.userData.AgenteID,
      10
    );
  }
  onGetKindOfBet(): void {
    this.ticketService.tipoApuesta$.subscribe((response) => {
      this.tipoApuesta = response;
      this.proccessingNumberOfOptionsBets(response);
    });
  }

  existElement(arr: string[], element: string): boolean {
    return arr.includes(element);
  }
  proccessingNumberOfOptionsBets(kindOfBet: TipoApuesta) {
    let displayedColumnsOrigin: string[] = [...this.ColumnsOrigin];

    if (kindOfBet.CantidadOpciones == 1) {
      displayedColumnsOrigin.splice(1, 0, 'circles1');
    }
    if (kindOfBet.CantidadOpciones == 2) {
      displayedColumnsOrigin.splice(1, 0, 'circles1');
      displayedColumnsOrigin.splice(2, 0, 'circles2');
    }
    if (kindOfBet.CantidadOpciones == 3) {
      displayedColumnsOrigin.splice(1, 0, 'circles1');
      displayedColumnsOrigin.splice(2, 0, 'circles2');
      displayedColumnsOrigin.splice(3, 0, 'circles3');
    }
    if (kindOfBet.CantidadOpciones == 4) {
      displayedColumnsOrigin.splice(1, 0, 'circles1');
      displayedColumnsOrigin.splice(2, 0, 'circles2');
      displayedColumnsOrigin.splice(3, 0, 'circles3');
      displayedColumnsOrigin.splice(4, 0, 'circles4');
    }

    this.displayedColumns = displayedColumnsOrigin;
  }
  onGetCarrera(): void {
    this.ticketService.carrera$.subscribe((response) => {
      this.carrera = response;
      this.onFetchCarreraDetail(this.userData.AgenteID, this.carrera.UID);
    });
  }

  onFetchCarreraDetail(agenteID: string, raceID: string): void {
    const carreraDetail = this.carreraDetalleService
      .fetchCarreraDetail(agenteID, raceID)
      .pipe(
        map((response) => {
          const carreraDetailArray = [];
          carreraDetailArray.push(...response);
          return (this.dataSource = carreraDetailArray);
        })
      )
      .subscribe((details) => {
        // console.log(details);
      });
  }

  AddNewDetailToTicket(favourite: any, index: number) {
    let detailSelected = this.getDetailSelected(favourite,index);
      this.raceTableService.addDetail(detailSelected,this.tipoApuesta.CantidadOpciones);
    
  }
  addToFavourites(favourite: any, index: number): void {
    let detailSelected = this.getDetailSelected(favourite,index);
    if (this.raceTableService.existDetailByIndex(detailSelected)) {
      this.raceTableService.removeDetailByNumber(detailSelected,this.tipoApuesta.CantidadOpciones);
    } else {
      this.AddNewDetailToTicket(favourite, index);
    }
  }
  getDetailSelected(favourite: any, index: number): DetailSelected {
    let detailSelected = new DetailSelected(
      favourite.UID,
      favourite.number,
      index,
      this.carrera.UID
    );
    return detailSelected;
  }
  getClass(favourite: any, index: number): string { 
    let detailSelected = this.getDetailSelected(favourite,index);
    return this.raceTableService.existDetailByIndex(detailSelected)
      ? 'circle-container-clicked'
      : 'circle-container-white';
  }
}

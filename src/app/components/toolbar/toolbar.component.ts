import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Carrera } from 'src/app/models/carrera.model';
import { Hipodromo } from 'src/app/models/hipodromo.model';
import { Init } from 'src/app/models/Init.model';
import { TipoApuesta } from 'src/app/models/tipoApuesta.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { HipodromoService } from 'src/app/services/hipodromo.service';
import { RaceTableService } from 'src/app/services/race-table.service';
import { TicketService } from 'src/app/services/ticket.service';
import { KindOfBetsService } from 'src/app/services/KindOfBets.service';
import { CustomValueComponent } from '../custom-value/custom-value.component';

export interface Amount {
  id: string;
  amount: number;
}
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit {
  id: string;
  amount: number;
  agentId: string;
  selectedBet: string = '';
  userData: Init;
  betValueList: Amount[] = [
    { id: 'val-0', amount: 10 },
    { id: 'val-1', amount: 25 },
    { id: 'val-2', amount: 50 },
    { id: 'val-3', amount: 100 },
    { id: 'val-4', amount: 200 },
    { id: 'val-5', amount: 250 },
    { id: 'val-6', amount: 500 },
    { id: 'val-7', amount: 1000 },
    { id: 'val-8', amount: 2000 },
  ];
  selectedValueBet: string = 'val-0';
  selectedHipo: Hipodromo;
  selectedHipodromoUID: string;
  hipodromosList: Hipodromo[] = [];
  selectedRace: Carrera;
  selectedRaceUID: string;
  carrerasList: Carrera[] = [];
  selectedItems: string[] = [];
  kindOfBetsList: TipoApuesta[] = [];
  constructor(
    private hipodromoService: HipodromoService,
    private carreraService: CarreraService,
    private raceTableService: RaceTableService,
    private ticketService: TicketService,
    private kindOfBetsService: KindOfBetsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let jsonObj: any = JSON.parse(localStorage.getItem('userData'));
    this.userData = <Init>jsonObj;
    this.agentId = this.userData.AgenteID;
    this.onFetchHipodromos(this.agentId);
    this.onSelectValorApuesta(this.betValueList[0].amount);
    this.raceTableService.favouritesList$.pipe().subscribe((response) => {
     // this.selectedItems = response;
    });
  }

  public onFetchHipodromos(agentId: string) {
    return this.hipodromoService
      .fetchHipodromos(agentId)
      .subscribe((responseData) => {
        this.hipodromosList = responseData;
        if (this.hipodromosList.length > 0) {
          this.onSelectHipo(this.hipodromosList[0]);
        }
      });
  }

  public onFetchCarreras(agentId: string, hipodromoId: string) {
    return this.carreraService
      .fetchCarrerasByAgenteIdAndHipodromoId(agentId, hipodromoId)
      .subscribe((responseData) => {
        this.carrerasList = responseData;
        if (this.carrerasList.length > 0) {
          this.onSelectCarrera(this.carrerasList[0]);
        }
      });
  }
  public onFetchKindOfBets(UIDKindOfBets: string[]) {
    return this.kindOfBetsService.getKindsOfBets().subscribe((responseData) => {
      this.kindOfBetsList = responseData;
      
      var defaultValues = this.kindOfBetsService.getDefaultKindsOfBets();
     
      if (UIDKindOfBets !== null) {
        this.kindOfBetsList = this.kindOfBetsList.filter((x) =>
          UIDKindOfBets.includes(x.UID)
        );

        this.kindOfBetsList =  this.kindOfBetsList.concat(
          responseData.filter((x) => defaultValues.includes(x.UID))
        );

      } else {
        this.kindOfBetsList = responseData.filter((x) =>
          defaultValues.includes(x.UID)
        );
      }
      this.kindOfBetsList = this.kindOfBetsList.sort((a, b) => a.Orden - b.Orden);
      
      if (this.kindOfBetsList.length > 0) {
        this.onSelectTipoApuesta(this.kindOfBetsList[0]);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomValueComponent, {
      data: {
        id: this.id,
        amount: this.amount,
      },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        this.onSelectValorApuesta(result);
        //console.log(`result: ${result}`);
      },
      (err) => {
        // console.error(err.message);
      }
    );
  }

  onSelectHipo(hipodromo: Hipodromo) {
    this.selectedHipo = hipodromo;
    this.selectedHipodromoUID = hipodromo.UID;
    this.onFetchCarreras(this.agentId, hipodromo.UID);
    this.ticketService.addHipodromoToTicketDetail(hipodromo);
  }

  onSelectCarrera(race: Carrera) {
    this.selectedRace = race;
    this.selectedRaceUID = race.UID;
    this.onFetchKindOfBets(race.TipoApuesta);
    this.ticketService.addCarreraToTicketDetail(race);
  }

  onSelectTipoApuesta(tipoApuesta: TipoApuesta) {
    this.selectedBet = tipoApuesta.UID;
    this.ticketService.addTipoApuestaToTicketDetail(tipoApuesta);
  }

  onSelectValorApuesta(valorApuesta: number) {
    this.ticketService.addValorApuestaToTicketDetail(valorApuesta);
  }
}

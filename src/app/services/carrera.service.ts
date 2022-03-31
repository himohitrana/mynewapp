import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carrera } from 'src/app/models/carrera.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  SERVER_URL: string = environment.URL_API;
  carreraResource = 'Carrera';
  public nextRacesList = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient ) {}

  fetchCarrerasByHipodromoId(hipodromoId:string): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(
      `${this.SERVER_URL}/${this.carreraResource}/${hipodromoId}`
    );
  }

  fetchCarrerasByAgenteIdAndHipodromoId(
    agenteID: string,
    hipodromoID: string
  ): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(
      `${this.SERVER_URL}/${this.carreraResource}/${agenteID}/${hipodromoID}`
    );
  }
  processingNextRacesByAgentAndPagination(agentID: string,
    pagination: number){
    this.fetchNextRacesByAgentIdAndPagination(agentID, pagination)
    .subscribe((responseData) => {
      this.nextRacesList.next(responseData);
    });
  }
  fetchNextRacesByAgentIdAndPagination(
    agentID: string,
    pagination: number
  ): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(
      `${this.SERVER_URL}/${this.carreraResource}/${agentID}/${pagination}/Next`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarreraDetalle } from 'src/app/models/carrera-detalle.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarreraDetalleService {
  SERVER_URL: string = environment.URL_API;
  carreraDetalleResource = 'CarreraDetalle';

  constructor(private http: HttpClient ) {}
  
  fetchCarreraDetail(agenteID:string,raceID:string): Observable<CarreraDetalle[]> {
    return this.http.get<CarreraDetalle[]>(
      `${this.SERVER_URL}/${this.carreraDetalleResource}/${agenteID}/${raceID}`
    );
  }
}

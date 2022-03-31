import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hipodromo } from 'src/app/models/hipodromo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HipodromoService {
  SERVER_URL: string = environment.URL_API;
  hipodromoResource: string = 'Hipodromo';

  constructor(private http: HttpClient) {}
  
  fetchHipodromos(agentId:string): Observable<Hipodromo[]> {
    return this.http.get<Hipodromo[]>(
      `${this.SERVER_URL}/${this.hipodromoResource}/${agentId}`
    );
  }

}

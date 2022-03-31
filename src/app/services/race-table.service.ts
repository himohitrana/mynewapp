import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DetailSelected } from '../models/DetailSelected.model';

@Injectable({
  providedIn: 'root',
})
export class RaceTableService {
  public favouritesList = new BehaviorSubject<DetailSelected[]>([]);
  public isThereAnyfavourite = new BehaviorSubject<boolean>(false);
  public favouritesList$ = this.favouritesList.asObservable();
  public isThereAnyfavourite$ = this.isThereAnyfavourite.asObservable();

  getNumberOfDetails(): number {
    return this.favouritesList.value.length;
  }
  addDetail(favourite: any, options: number): void {
    if (this.getNumberOfDetails() === 0) {
      this.favouritesList.next(this.favouritesList.getValue().concat(favourite));
    } else {
      let detailElement = this.favouritesList.value.filter( (x) => x.Index===favourite.Index && x.Number===favourite.Number && x.UIDRacing ===favourite.UIDRacing)[0];

      if (detailElement === undefined) {
      this.favouritesList.next(this.favouritesList.getValue().concat(favourite));
      } 
    }
    this.processingIsThereAnyFavorite();
  }
  processingIsThereAnyFavorite(): void {
    this.isThereAnyfavourite.next(this.favouritesList.value.length == 0);
  }
  removeDetailByNumber(favourite: any, options: number): void {
    let detailElementGeneral = this.favouritesList.value.filter(x=>x.Number ===favourite.Number && x.Index ===favourite.Index)[0];

    const indexArr = this.favouritesList.value.indexOf(detailElementGeneral, 0);
    if (indexArr > -1) {
      this.favouritesList.value.splice(indexArr, 1);
    }

    this.processingIsThereAnyFavorite();
  }
  removeDetailByNumberAndIndex(favourite: any): void {
    let detailElement = this.favouritesList.value.filter(x=>x.Number ===favourite.Number && x.Index ===favourite.Index)[0];

    const index = this.favouritesList.value.indexOf(detailElement, 0);
    if (index > -1) {
      this.favouritesList.value.splice(index, 1);
    }

    this.processingIsThereAnyFavorite();
  }
  existDetailByIndex(favourite: any): boolean {
    return this.favouritesList.value.filter(x=>x.Number ===favourite.Number && x.Index ===favourite.Index).length>0;
  }
}

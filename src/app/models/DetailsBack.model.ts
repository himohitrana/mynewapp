import { DetailSelected } from './DetailSelected.model';

export class DetailsBack {
  public details: DetailSelected[]=[];
  constructor() {}

  
  Add(detail: DetailSelected) {
    this.details.push(detail);
  }

  Length(): number {
    return this.details.length;
  }

  Remove(detail: DetailSelected) {
    let detailElement = this.details.filter(
      (x) => x.Number === detail.Number && x.Index === detail.Index
    )[0];

    const index = this.details.indexOf(detailElement, 0);
    if (index > -1) {
      this.details.splice(index, 1);
    }
  }
  Exist(detail: DetailSelected): boolean {
    var numbers = this.details.map((det) => det.Number );
    return numbers.includes(detail.Number);
  }
  ExistWithIndex(detail: DetailSelected): boolean {
    return this.details.filter(x=>x.Number ===detail.Number && x.Index ===detail.Index).length>0;
  }
}

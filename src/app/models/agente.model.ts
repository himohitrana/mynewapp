export class Agente {
  constructor(
    public nombre: string,
    public UID: string,
    public activo: boolean,
    public fecha: Date,
    public UID_Banca: string,
    public UID_Moneda: string
  ) {}
}

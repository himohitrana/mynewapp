export class User {
  constructor(
    public UID: string,
    public agente: string,
    public agenteID: string,
    public amount: number,
    public banca: boolean,
    public bancaID: Date,
    public coin: Date,
    public errorDesc: Date,
    public error: Date
  ) {}
}

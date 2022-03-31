export class TipoApuesta {
  constructor(
    public UID: string,
    public Nombre: string,
    public CantidadOpciones: number,
    public activo: boolean,
    public Orden:number,
    public fecha: Date
  ) {}

}

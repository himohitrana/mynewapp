export class ResultadoTipoApuesta {
  constructor(
    public UID: { type: string; required: true },
    public type: { type: string; required: false },
    public numbers: { type: string; required: false }, //what kind of numbers?
    public payoff: { type: string; required: false },
    public pool: { type: string; required: false },
    public fecha: { type: Date; required: true },
    public UID_Carrera: { type: string; required: true },
    public UID_Hipodromo: { type: string; required: true }
  ) {}
}

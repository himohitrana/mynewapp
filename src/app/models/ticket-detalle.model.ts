import { Runners } from "./Runners.model";

export class TicketDetalle {
  constructor(
    public UID_Carrera: string,
    public UID_Hipodromo: string,
    public UID_TipoApuesta: string,
    public Numbers: string,
    public valorApuesta: number,
    public Runners: Runners[]
  ) {}
}

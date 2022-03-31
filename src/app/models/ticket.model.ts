import { TicketDetalle } from "./ticket-detalle.model";

export class Ticket {
  constructor(
    public UID_Banca: string,
    public UID_Agente: string,
    public Usuario: string,
    public CantidadUnidades: number,
    public UID_TipoApuesta: string,
    public TipoApuesta: string,
    public saldo: number,
    public Monto: number,
    public Submit :boolean,
    public Detalle: TicketDetalle[]
  ) {}
}
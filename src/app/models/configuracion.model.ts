import { TipoApuestaConfiguracion } from "./tipo-apuesta-configuracion.model";

export class Configuracion {
  constructor(
    public UID: { type: string; required: true; unique: true },
    public UID_Banca: { type: string; required: true },
    public UID_Agente: { type: string; required: true; unique: true },
    public maxRiesgoCarrera: { type: number; required: true },
    public maxRiesgoEjemplar: { type: number; required: true },
    public maxRiesgoTicket: { type: number; required: true },
    public minJugarTicket: { type: number; required: true },
    public hipodromosBlock: { type: [number]; required: true },
    public tipoApuesta: { type: TipoApuestaConfiguracion[]; required: true },
    public fecha: { type: Date; required: true },
    public block: { type: boolean; required: true }
  ) {}
}

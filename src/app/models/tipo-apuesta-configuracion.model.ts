export class TipoApuestaConfiguracion {
  constructor(
    public UID_TipoApuesta: { type: string; required: true },
    public maxRiesgo: { type: number; required: true },
    public maxPagar: { type: number; required: true }
  ) {}
}

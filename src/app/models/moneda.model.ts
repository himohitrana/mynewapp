export class Moneda {
  constructor(
    public UID: { type: string; required: true; unique: true },
    public nombre: { type: string; required: true; unique: true },
    public activo: { type: boolean; required: true },
    public fecha: { type: Date; required: true }
  ) {}
}

export class Resultado {
  constructor(
    public UID: { type: string; required: true },
    public posicion: { type: string; required: false },
    public number: { type: string; required: false },
    public name: { type: string; required: false },
    public wgt: { type: string; required: false },
    public jockey: { type: string; required: false },
    public time: { type: string; required: false },
    public distance: { type: string; required: false },
    public sp: { type: string; required: false },
    public id: { type: string; required: false },
    public fecha: { type: Date; required: true },
    public UID_Carrera: { type: string; required: true },
    public UID_Hipodromo: { type: string; required: true }
  ) {}
}

export class Carrera {
  constructor(
    public UID: string,
    public name: string,
    public time: string,
    public post_time: string,
    public offAt: string,
    public clase: string, //rename this field
    public purse: string,
    public distance: string,
    public surface: string,
    public datetime: Date,
    public id: string,
    public status: string,
    public activo: boolean,
    public UID_Hipodromo: string,
    public TipoApuesta: [string],
    public fecha: Date
  ) {}
}

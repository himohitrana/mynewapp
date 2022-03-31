export class Hipodromo {
  constructor(
    public UID: string,
    public Nombre: string,
    public activo: boolean,
    public fecha: Date,
    public clasificacion: string,
    public pais: string
  ) {}
}

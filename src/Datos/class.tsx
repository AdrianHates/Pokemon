export class Usuario {
  user_id: any;
  nombre: any;
  genero: any;
  x: any;
  y: any;
  created_at: any;

  constructor(data: any[]) {
    [this.user_id, this.nombre, this.genero, this.x, this.y, this.created_at] = data;
  }
}
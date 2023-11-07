export class Player {
  user_id: any;
  nombre: any;
  genero: any;
  x: any;
  y: any;
  created_at: any;
  pokemons: Array<object>

  constructor(data: any) {
    const { usuario, pokemons } = data;
    [this.user_id, this.nombre, this.genero, this.x, this.y, this.created_at] = Object.values(usuario);

    this.pokemons = pokemons;
  }
}
export default function crearSeed ( x:number,y:number ) {
  const mapa = []
  for (let i = 0; i < 20; i++) {
    const fila = [];
    for (let j = 0; j < 11; j++) {
      const terreno = Math.random() < 0.5 ? 'grass' : 'tierra';
      fila.push({ clase: terreno, suelo: "pastito" });
    }
    mapa.push(fila);
  }
  mapa[0][10].clase = ''
  return mapa
}

export const host = 'https://backendpokemon.onrender.com'


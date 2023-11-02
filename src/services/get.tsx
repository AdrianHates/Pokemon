import { host } from "../Datos/datos"

export async function getPokemonById ( id : number ) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await response.json()
  return data 
}

export async function getMoveById ( id: number ) {
  const response = await fetch(`https://pokeapi.co/api/v2/move/${id}`)
  const data = await response.json()
  return data
}

export async function cargarPartidas() {
  const response = await fetch(`${host}/api/v1/usuarios`)
  const data = await response.json()
  return data
}

export async function cargarPartidaByID(id:number) {
  const response = await fetch(`${host}/api/v1/usuarios/${id}`)
  const data = await response.json()
  return data
}
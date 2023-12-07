import { useEffect, useState, useReducer } from 'react'
import { Routes, Route } from 'react-router-dom';

import './App.css'
import World from './Pages/World/World';
import Duelo from './Pages/Duelo/Duelo';
import Inicio from './Pages/Inicio/InicioPage';
import EscritorDatos from './Pages/EscritorDatos/Escritor.DatosPage';
import { getPokemonById } from './services/get';
import useProbability from './CustomHooks/useProbability';

export const spriteBruno = 'https://i.imgur.com/6oa9is6.png'
export const newSpriteBruno = 'https://i.imgur.com/HmHblAj.png'
function playerReducer(state:any, action:any) {
  switch (action.type) {
      
    case 'MOVE_RIGHT':
      if(state.x >= 19) {
        return state
      }
      return { ...state, x: state.x + 1, debounce: true };
    case 'MOVE_LEFT':
      if(state.x <=0) {
        return state
      }
      return { ...state, x: state.x - 1, debounce: true };
    case 'MOVE_UP':
      if(state.y <= 0) {
        return state
      }
      return { ...state, y: state.y - 1, debounce: true };
      
    case 'MOVE_DOWN':
      if(state.y >= 10) {
        return state
      }
      return { ...state, y: state.y + 1, debounce: true };
    case 'NEW_VALUE':
      return action.payload
    default:
      return state;
  }
}


function App() {
  const [confirmState, setConfirmState] = useState(null) //1
  const [mapa, setMapa] = useState(null)  //1
  const [player, dispatchPlayer] = useReducer(playerReducer, null); //1
  const [seed, setSeed] = useState(null) // 1
  const [me, setMe] = useState(null)
  const [enemigo, setEnemigo] = useState(null) //0
  const [debounce, setDebounce] = useState(false) //1
  const [evento, setEvento] = useState(null) //0
  const pokemones = [1,4,7,25] //0
  const { result, updateProbability } = useProbability(null)
  /*
  async function cargarPokemons () {
    const pokemones = Object.values(player.pokemon)
    console.log(pokemones[0])
    for(let i=0; i<=5;i++) {
      if(pokemones[i]) {
        const data = await getPokemonById(pokemones[i].id)
        for(let i = 0; i < 4; i++) {
          if(!data.abilities[i]) {
            data.abilities[i] = {
              ability: {
                name: '-'
              }
            }
          }
        }
        player.pokemon[i].data = {...data}
      } else {
        player.pokemon[i] = {}
      }

    }
  }
*/
  useEffect(() => {
    const numero = Math.floor(Math.random() * pokemones.length)
    if(result) {
      setEvento({
      name: `Ha aparecido un pokemón!`,
      pokemon: `${numero}`,  

      })
      getPokemonById(player.pokemons[0].pokemon_id)
      .then((data) => {
        const newData = {...data, XP: player.pokemons[0].XP, HPActual: data.stats[0].base_stat}
        setMe(newData)
      }).catch((error) => {
        console.log(error)
      })
      getPokemonById(pokemones[numero])
      .then((data) => {
        const newData = {...data, Nv: 10, HPActual: data.stats[0].base_stat}
        setEnemigo(newData);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }, [result])


  useEffect(() => {
    
    if(player&&seed) {
    const updateSeed = seed.map(row => row.map( cell => ( { ...cell } )))
    updateSeed[player.x][player.y].tipo = 'player'
    
      if(updateSeed[player.x][player.y].clase === 'grass') {
      updateProbability(0.4)     
    }

    if(updateSeed[player.x][player.y].clase === 'tierra') {
      setEvento(false)
    }

    setMapa(updateSeed)
    }
  }, [player])
  console.log(player)
  console.log(me)
  return (
    <Routes>
      <Route path='/' element={<Inicio setSeed={setSeed} dispatchPlayer={dispatchPlayer} confirmState={confirmState} setConfirmState={setConfirmState} />} />
      <Route path='EscritorDatos' element={<EscritorDatos confirmState={confirmState} setConfirmState={setConfirmState} />} />
      <Route path="/world" element={<World dispatchPlayer={dispatchPlayer} debounce={debounce} setDebounce={setDebounce} mapa={mapa} evento={evento} />} />    
      {
        player && <Route path="/duelo" element={<Duelo yo={me} setEvento= {setEvento} pokemonEnemigo={enemigo} />} />    
      }
    </Routes>
  )
}

export default App

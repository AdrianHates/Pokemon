import { useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom";
import MenuOptions from "./MenuOptions";
import AskGender from "./AskGender"
import "./InicioPage.css"
import Plataforma from "./Plataforma";
import Options from "../../Componentes/Options";
import { nuevPartida } from "../../services/post";
import { cargarPartidaByID, cargarPartidas } from "../../services/get";
import { Usuario } from "../../Datos/class";
import crearSeed from "../../Datos/datos";

const ACTIONS = {
  MOVE_UP: "move_up",
  MOVE_DOWN: "move_down",
  SELECT_OPTION: "select_option",
  START_GAME: "start_game",
  SELECT_GENDER: "select_gender",
  SELECT_CONFIRM: "select_confirm",
  ALL: "all"
};

async function cargarPlayer(id:number) {
  const data = await cargarPartidaByID(id)
  return data
}

function optionsReducer(state, action) {
  switch (action.type) {
    case ACTIONS.MOVE_UP:
      return {
        ...state,
        indexOption: Math.max(0, state.indexOption - 1),
      };
    case ACTIONS.MOVE_DOWN:
      return {
        ...state,
        indexOption: Math.min(state.options.length - 1, state.indexOption + 1),
      };
    case ACTIONS.SELECT_OPTION:
      if (state.options[state.indexOption] === "Partida Nueva") {
        return {
          ...state,
          gameState: "menu-gender",
          options: ["Varón", "Chica"],
        };
      }
      if(state.options[state.indexOption]['id']) {
        console.log(state.options[state.indexOption]['id'])
      }
      return state;

    case ACTIONS.SELECT_GENDER:
      if (state.gameState === "menu-gender") {        
        return {
          ...state,
          gameState: "register-name",  // Cambia el estado al seleccionar el género
        };
      }
      return state;
    case ACTIONS.SELECT_CONFIRM:
      if(state.gameState === "menu-confirm") {
        return state
      }
      return state
    case ACTIONS.ALL:
      return action.payload
    default:
      return state;
  }
}


export default function Inicio ( { setSeed, dispatchPlayer, confirmState, setConfirmState } ) {
  
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(optionsReducer, confirmState)

  async function handleKeyPress(event) {
    switch (event.key) {
      case "ArrowUp":
        dispatch({ type: ACTIONS.MOVE_UP });
        break;
      case "ArrowDown":
        dispatch({ type: ACTIONS.MOVE_DOWN });
        break;
      case "Enter":
        if (state.gameState === "menu-options") {
          dispatch({ type: ACTIONS.SELECT_OPTION })
          if(state.options[state.indexOption]['id']) {
            const data = await cargarPlayer(state.options[state.indexOption]['id'])
            const newData = new Usuario(data)
            dispatchPlayer( { type: 'NEW_VALUE', payload: newData })
            setSeed(crearSeed)
            navigate('/world')
          }
          
        } else if (state.gameState === "menu-gender") {
          setConfirmState({
            ...confirmState,
            datos:  {
              gender: state.options[state.indexOption],
            }
          })          
          dispatch({ type: ACTIONS.SELECT_GENDER });
          navigate("/EscritorDatos")
        } else if (state.gameState === "menu-confirm" && state.indexOption === 0) {
          dispatch({ type: ACTIONS.SELECT_CONFIRM })
          await nuevPartida(state)
          navigate("/world")
        }
        break;
      default:
        break;
    }
  }
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);

    };
  },[state])

  useEffect(() => {
    if(!confirmState?.datos) {
    const fetchData = async () => {
      const partidas = await cargarPartidas();
      const upgradePartidas = partidas && partidas.map( x => {
        return {
          id: x[0],
          name: x[1],
          gender: x[2],    
          time: x[3],
        }
      })
      const initialState = {
        options: upgradePartidas ? [ ...upgradePartidas , "Partida Nueva", "Opciones"] : ["Partida Nueva", "Opciones"], 
        indexOption: 0,
        gameState: "menu-options", 
      };
      dispatch({ type: ACTIONS.ALL, payload: initialState });
    };
  
    fetchData();
  }
  }, []);
    return(
      state && 
    <section id={`inicio-${state.gameState}`}>
      
        {state.gameState === "menu-options" && (          
          <MenuOptions
          options={state.options}
          indexOption={state.indexOption}
        />
        )}        
        {state.gameState === "menu-gender" && (
          <><Options
          options={state.options} 
          indexOption={state.indexOption}
        />
          <Plataforma 
          i={state.indexOption}
          url={['https://i.imgur.com/EoKJJB5.png','https://i.imgur.com/mw9dlyo.png']}
          />
          </>
        )}
        {
          state.gameState === "menu-confirm" && (
            <Options
            options={state.options}
            indexOption={state.indexOption}
            />
          )
        }
        
    </section>
  )
}
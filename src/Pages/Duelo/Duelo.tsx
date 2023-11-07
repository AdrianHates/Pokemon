import Pokemon from "../../Componentes/Pokemon";
import { useState, useEffect, useReducer } from "react";
import { useNavigate} from "react-router-dom";
import { plataformaDuelo } from "../../assets/svgs";
import BarraDuelo from "../../Componentes/BarraDuelo";
import './styles.css/Duelo.css'
const opciones = ['LUCHA', 'MOCHILA', 'POKÉMON', 'HUIDA']


export default function Duelo ( { yo, pokemonEnemigo, setEvento } ) {

  const [displayText, setDisplayText] = useState('');
  const typingSpeed = 50
  const [secuencia, setSecuencia] = useState(false)
  const [pokemon, setPokemon] = useState(pokemonEnemigo)
  const [animation, setAnimation] = useState(false)
  const navigate = useNavigate();

  const [select, dispatch] = useReducer(selectReducer, {
    opcion: 0,
    opcionesHabilidadesAnimation: null
  });

  function selectReducer(state, action) {
    switch (action.type) {
      case 'MOVE_RIGHT':
        if(state.opcion === 1 || state.opcion === 3) return state
        return {...state, opcion: state.opcion + 1}
      case 'MOVE_LEFT':
        if(state.opcion === 0 || state.opcion === 2) return state
  
        return {...state, opcion: state.opcion - 1}
      case 'MOVE_UP':
        if(state.opcion === 0 || state.opcion === 1) return state
  
        return {...state, opcion: state.opcion - 2}
      case 'MOVE_DOWN':
        if(state.opcion === 2 || state.opcion === 3) return state
  
        return {...state, opcion: state.opcion + 2}
      case 'Z':
        if(state.opcionesHabilidadesAnimation === 0) {
          return {...state, opcionesHabilidadesAnimation: 1}
        }
        if(state.opcionesHabilidadesAnimation === 1) {
          atacar(state)
          return {...state, opcionesHabilidadesAnimation: 2 }
        }
        if(state.opcionesHabilidadesAnimation === 2) {
          console.log('Hola')
        }
        return state
      case 'MOSTRAR_OPCIONES':
        return {
          ...state,
          opcionesHabilidadesAnimation: 0, 
        };
      default:
        return state;
    }
  }
  
/*
  function TablaDeLucha () {
    const first = yo[0].data.name.slice(0,1).toUpperCase()
    const last = yo[0].data.name.slice(1)
    setDisplayText(`¿Qué debería hacer ${first + last} ?`)
    dispatch({ type: 'MOSTRAR_OPCIONES' });
  }
*/
  function atacar(state) {
    setPokemon({...pokemon, HPActual: pokemon.HPActual - yo.habilidades[state.opcion].damage })
  }

  function selectMostrarOpciones (event) {
    switch (event.key) {
      case 'ArrowRight':
        dispatch({ type: 'MOVE_RIGHT' });
        break;
      case 'ArrowLeft':
        dispatch({ type: 'MOVE_LEFT' });
        break;
      case 'ArrowDown':
        dispatch({ type: 'MOVE_DOWN' });
        break;
      case 'ArrowUp':
        dispatch({ type: 'MOVE_UP' });
        break;
      case 'z':
        dispatch({ type: 'Z' });
        break;
      default:
        break;
      }
  }
  /*
  useEffect(() => {
    if(!secuencia) {
      let currentIndex = 0;
      let initialText = `${pokemon.name} salvaje ha aparecido!`
      const typingInterval = setInterval(() => {
        if (currentIndex <= initialText.length) {
          setDisplayText(initialText.slice(0, currentIndex));
          currentIndex += 1;
        } else {
          clearInterval(typingInterval);

          currentIndex = 0
          initialText = `Aparece ${yo[0].data.name}!`;
            setTimeout(() => {
              const newTypingInterval = setInterval(() => {
              if (currentIndex <= initialText.length) {
                setDisplayText(initialText.slice(0, currentIndex));
                currentIndex ++
              } else {
                clearInterval(newTypingInterval);
                setSecuencia(true)
              }
          }, typingSpeed)
        }, 1000)
      }
      }, typingSpeed);
      
      return () => {
        
        clearInterval(typingInterval);
      };
      
  } else {
    setTimeout(() => {
      TablaDeLucha()
    }, 1000)
  }
  

  }, [secuencia]);
*/
  useEffect( () => {
    document.addEventListener('keydown', selectMostrarOpciones);
    return () => {
      document.removeEventListener('keydown', selectMostrarOpciones);
    }
  }, [])
/*
  useEffect( () => {
    if(pokemon.HPActual === 0) {
      setEvento(false)
      navigate("/world");
    }
  } , [pokemon.HPActual])
*/
/*
  useEffect (() => {
    if(select.opcionesHabilidadesAnimation === 2) {
      setTimeout(() => {
        setAnimation(true)
        setTimeout(() => {
          setAnimation(false)
          select.opcionesHabilidadesAnimation = 0        
        }, 1000)
      }, 1000)
    }
    
  }, [select.opcionesHabilidadesAnimation])
*/
console.log(yo)
  return(
    <div id='duelo'>
      <div>
        <div style={{backgroundColor: `${animation?'white':''}`, opacity: `${animation?'0.5':''}` ,animation:`${animation?'impactrueno-animation 1s ease infinite':''}`}}>
          <Pokemon alt={pokemonEnemigo.name} src={pokemon.sprites.versions['generation-iii'].emerald.front_default} />
          {plataformaDuelo}
          
        </div>

        <BarraDuelo datos={pokemonEnemigo} />
      </div>
      <div>
        <div>
        <Pokemon alt={yo.name} src={yo.sprites.versions['generation-iii']['ruby-sapphire'].back_default} />
        {plataformaDuelo}
        </div>
        <BarraDuelo datos={yo} />

        </div>
      <div className="descripcion-duelo" >
        {(select.opcionesHabilidadesAnimation === null || select.opcionesHabilidadesAnimation === 0) && <div className="texto">{displayText}</div>}
        {
          select.opcionesHabilidadesAnimation === 0 && <div className="opciones">
            {
              opciones.map( (x,i) => {
                return <div style={{position: 'relative'}} key={i}>{x}
                {
                  select.opcion===i?<div style={{position: 'absolute', left: '-2rem'}}>▶</div>:null
                }
                </div>
              })
            }
            
          </div>
        }
        {
              select.opcionesHabilidadesAnimation === 1 && <><div className="habilidades"> 
              {(yo[0].data.abilities).map( (x,i) => {
                return <div style={{position: 'relative'}} key={i}>{x.ability.name}
                  
                  {select.opcion===i?<div style={{position: 'absolute', top: '0', left: '-3rem'}}>▶</div>:null}
                </div>
              })
              }
              
              </div>
              <div className="datos-pokemon">
                asd
              </div>
              </>
            }
      </div>
    </div>
  )
}
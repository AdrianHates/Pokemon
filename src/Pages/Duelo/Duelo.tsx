import { AvatarImg, AvatarBackImage } from "../../Componentes/Avatar";
import { useState, useEffect, useReducer } from "react";
import { useNavigate} from "react-router-dom";
import { plataformaDuelo } from "../../assets/svgs";
import BarraDuelo from "../../Componentes/BarraDuelo";
import './styles.css/Duelo.css'
import { newSpriteBruno, spriteBruno } from "../../App";
import useTypingEffect from "../../CustomHooks/useTypingEffect";
const opciones = ['INVOCANDO', 'LUCHA', 'MOCHILA', 'POKÉMON', 'HUIDA']


export default function Duelo ( { yo, pokemonEnemigo, setEvento } ) {

  const [secuencia, setSecuencia] = useState(opciones[0])
  const [pokemon, setPokemon] = useState(pokemonEnemigo)
  const [animation, setAnimation] = useState(false)
  const [animationSummon, setAnimationSummon] = useState('fade-in-right 2s forwards');
  
  const [frameIndex, setFrameIndex] = useState(0);
  const [textoTipificado, setTextoTipificado] = useState('')
  const { displayText, finishedTyping } = useTypingEffect(textoTipificado, 100)

  
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

  useEffect( () => {
    document.addEventListener('keydown', selectMostrarOpciones);
    return () => {
      document.removeEventListener('keydown', selectMostrarOpciones);
    }
  }, [])

  useEffect(() => {
    if(frameIndex > 2) {
      return
    }
    if(frameIndex === 1) {
      setTextoTipificado('Un pokemon salva ha aparecido!')
    }

    if(frameIndex===2) {
      setAnimationSummon('translate-out-left 3s forwards')
    }
    
    const intervalId = setInterval(() => {
      setFrameIndex((prevFrameIndex) => (prevFrameIndex + 1));
    }, 2000);

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [frameIndex]);

console.log(textoTipificado)
  return(
    <div id='duelo'>
      <div>
        <div style={{backgroundColor: `${animation?'white':''}`, opacity: `${animation?'0.5':''}` ,animation:`${animation?'impactrueno-animation 1s ease infinite':''}`}}>
          <AvatarImg alt={pokemonEnemigo.name} src={pokemonEnemigo.sprites.versions['generation-iii'].emerald.front_default} />
          {plataformaDuelo}
          
        </div>

        <BarraDuelo datos={pokemonEnemigo} />
      </div>

      {secuencia === 'INVOCANDO' && <div>
        <div><AvatarBackImage animation={animationSummon} url={newSpriteBruno} backgroundPosition={`${-frameIndex*240}px -520px`} className='invocando' />
        </div>
      </div>}

      {false&&<div>
        <div>
        <AvatarImg alt={yo.name} src={yo.sprites.versions['generation-iii']['ruby-sapphire'].back_default} />
        {plataformaDuelo}
        </div>
        <BarraDuelo datos={yo} />

      </div>}
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
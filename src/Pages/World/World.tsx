import { useEffect, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import { spriteBruno } from "../../App";
import './styles/World.css'

export default function World ( { dispatchPlayer, debounce, setDebounce, mapa, evento }) {
  const [backgroundImagePosition, setBackgroundPosition] = useState('');
  const [scaleX, setScaleX] = useState('')
  const location = useLocation();
  const isWorldPage = location.pathname === '/world'
  const navigate = useNavigate();

  const texturaBase = {
    pastito: 'https://i.pinimg.com/564x/98/c1/5a/98c15a449a1166ec23f5c9f1f63995dd.jpg',
    tierrita: 'https://cdn1.vectorstock.com/i/1000x1000/96/70/pixel-minecraft-style-land-block-background-vector-36579670.jpg'

  }

  const texturaAction = {
    
    grass: 'https://archives.bulbagarden.net/media/upload/3/33/RSE_Grass.png'
  }

  useEffect(()=>{
    if(evento) {
      setTimeout(()=>{
        navigate('/duelo');
      }, 2000)
    }
  },[evento])

  useEffect(() => {
    
    function handleKeyPress (event) {
      if(!isWorldPage) {
        return
      }
      if(debounce) {
        return
      }
      if(evento) {
        return
      }
      switch (event.key) {
        case 'ArrowRight':
          setBackgroundPosition('-140px 0px')
          setScaleX('scaleX(-1)')
          dispatchPlayer({ type: 'MOVE_RIGHT' });
          break;
        case 'ArrowLeft':
          setBackgroundPosition('-140px 0px') 
          setScaleX('')
         
          dispatchPlayer({ type: 'MOVE_LEFT' });
          break;
        case 'ArrowDown':
          setBackgroundPosition('0px 0px')
          setScaleX('')

          dispatchPlayer({ type: 'MOVE_DOWN' });
          break;
        case 'ArrowUp':
          setBackgroundPosition('-70px 0px')
          setScaleX('')

          dispatchPlayer({ type: 'MOVE_UP' });
          break;
        default:
          break;
        }
        setDebounce(true)
        setTimeout(() => {
          setDebounce(false)
        }, 0)

      }
  
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);

    };
  }, [debounce, evento]);
  
  return(
    <div id='world'>
      <div>
            {
              mapa && mapa.map( (x,i) => <div key={i}>
                {
                  x.map( (y, j) => <div key={j} style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(${texturaBase[y.suelo]})`}} className='celda'>
                  {
                    texturaAction[y.clase] && <img width="100%" alt={j} src={texturaAction[y.clase]} />

                  }
                  {
                    y.tipo && <div style={{ backgroundImage: `url(${spriteBruno}`, backgroundPosition: backgroundImagePosition, transform: scaleX}} />
                  }
                  </div>)
                }
              </div> )
            }
      </div>
      
      {evento && 
      <div className="descripcion-world">
      {evento.name}
      </div>
      }
  </div>
  )
}
import './styles/ShowWords.css'
import { spriteBruno } from '../../App'
import { useState, useEffect } from 'react';

export default function ShowWords ( { name } ) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [saltito, setSaltito] = useState(true);
  const frameCount = 3;

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevFrameIndex) => (prevFrameIndex + 1) % frameCount);
      setSaltito(!saltito)
    }, 150); // Ajusta el intervalo de tiempo según la velocidad de la animación

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [frameIndex]);

  return (
    <div className="show-words">
      <div>
        <div style={{transform: `${saltito?'translateY(1.5px)':'translateY(0px)'}`, backgroundPosition: `0px -${frameIndex*66 }px`, backgroundImage: `url(${spriteBruno})`, }} />
        <div />
      </div>
      <div>
        <h3>¿CÓMO TE LLAMAS?</h3>
        <div>
        <div className='flecha-show-words' style={{animation: 'oscilate 1s infinite'}}></div>

          {
            Array(7).fill(0).map( (_,i) =>
            <div key={i} className='show-letter' style={{animation: name.length === i? 'spaceLetter .75s infinite':''}}>
            {name[i] && name[i]}
            </div>
            )
              
          }
        </div>       
      </div>
    </div>
  )
}
import "./styles/Plataforma.css"
import { useState, useEffect } from 'react' 
export default function Plataforma( { url, i } ) {
  const [change, setChange] = useState(i)
  const [animation, setAnimation] = useState(false)
  useEffect(() => {
    if(i !== change) {
      setChange(['entrar','salir'])
      setAnimation(true)
    }
  }, [i])
  return(
    <div id='plataforma'>
      <div className="plataforma"></div>
      
        <img
        className={typeof(change)==='object'?change[i===0?1:0]:''}
        src={url[0]} alt='avatar' />
        {
          (typeof(change)==='object' && animation) && <img
          className={typeof(change) ==='object'?change[i===1?1:0]:''}
          src={url[1]} alt='avatar' />
        }
     
    </div>
  )
}
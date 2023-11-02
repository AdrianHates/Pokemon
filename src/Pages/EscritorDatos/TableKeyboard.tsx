import './styles/TableKeyboard.css'
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const allGroup = ['AGMT','BHNU','CIOV', 'DJPW','EKQX', 'FLRY', '  SZ', '.,  ']



export default function TableKeyboard ( { name, setName, confirmState, setConfirmState } ) {

  const [selectedElement, setSelectedElement] = useState(null);
  const [elementosArray, setElementosArray] = useState([]);
  const refs = useRef({})
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    const tecla = event.key;
    const centroX = (selectedElement.offsetLeft + selectedElement.offsetRight) / 2;
    const centroY = (selectedElement.offsetTop + selectedElement.offsetBottom) / 2;

    if (tecla === 'ArrowRight') {

      let elementoSeleccionado;
      let distanciaMinima = Infinity;

      elementosArray.forEach((current) => {
      const centroYEl = (current.offsetTop + current.offsetBottom) / 2;
      const distance = Math.sqrt(Math.abs(centroX - current.offsetLeft) ** 2 + Math.abs(centroY - centroYEl) ** 2);

      if (current.offsetLeft > centroX && distance < distanciaMinima) {
        elementoSeleccionado = current;
        distanciaMinima = distance;
      }
});   
      if(elementoSeleccionado) {
      setSelectedElement(elementoSeleccionado)
      }
    }
    if (tecla === 'ArrowLeft') {
      let elementoSeleccionado;
      let distanciaMinima = Infinity;

      elementosArray.forEach((current) => {
      const centroYEl = (current.offsetTop + current.offsetBottom) / 2;
      const distance = Math.sqrt(Math.abs(centroX - current.offsetRight) ** 2 + Math.abs(centroY - centroYEl) ** 2);

      if (current.offsetRight < centroX && distance < distanciaMinima) {
        elementoSeleccionado = current;
        distanciaMinima = distance;
      }
});   
      if(elementoSeleccionado) {
        setSelectedElement(elementoSeleccionado)
        }
    }
    if (tecla === 'ArrowUp') {
      let elementoSeleccionado;
      let distanciaMinima = Infinity;

      elementosArray.forEach((current) => {
      const centroXEl = (current.offsetLeft + current.offsetRight) / 2;
      const distance = Math.sqrt(Math.abs(centroX - centroXEl) ** 2 + Math.abs(centroY - current.offsetBottom) ** 2);

      if (current.offsetBottom < centroY && distance < distanciaMinima) {
        elementoSeleccionado = current;
        distanciaMinima = distance;
      }
});   
      if(elementoSeleccionado) {
        setSelectedElement(elementoSeleccionado)
        }
    }
    if (tecla === 'ArrowDown') {
      let elementoSeleccionado;
      let distanciaMinima = Infinity;

      elementosArray.forEach((current) => {
      const centroXEl = (current.offsetLeft + current.offsetRight) / 2;
      const distance = Math.sqrt(Math.abs(centroX - centroXEl) ** 2 + Math.abs(centroY - current.offsetTop) ** 2);

      if (current.offsetTop > centroY && distance < distanciaMinima) {
        elementoSeleccionado = current;
        distanciaMinima = distance;
      }
});   
      if(elementoSeleccionado) {
        setSelectedElement(elementoSeleccionado)
        }
    }

    if(tecla.toLowerCase() === 'x') {
      setName(name + selectedElement.element);

    }

    if(tecla.toLowerCase() === 'z') {
      setName(name.slice(0, name.length - 1));

    }

    if(tecla === 'Enter') {
      setConfirmState( {
        datos: {
          ...confirmState.datos,
          name: name
        },
        gameState: "menu-confirm",
        indexOption: 0,
        options: ['Si', 'No'],   

      } )

      navigate("/")
      
    }
  };

  useEffect(() => {
    const elementosArray = [];
    for (const key in refs.current) {
      if (refs.current.hasOwnProperty(key)) {
        const indices = key.split('-')
        const elemento = refs.current[key]
        const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = elemento;
        const elementoSeleccionado = {
          id: key,
          element: allGroup[indices[1]][indices[0]],
          offsetTop,
          offsetBottom: offsetTop + offsetHeight,
          offsetLeft,
          offsetRight: offsetLeft + offsetWidth,
        };
        if( key === '0-0' && !selectedElement) {
          setSelectedElement(elementoSeleccionado)
        }
        elementosArray.push(elementoSeleccionado);
      }
    }
    setElementosArray(elementosArray);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedElement, name]);
  return (
    <div className="table-keyboard"
     onKeyDown={handleKeyDown}
     tabIndex={0}
    >
      <div>
        {
          allGroup.map( (x,i) => 
            <div key={i}>
              {
                x.split('').map( (y,index) => {
                  
      
                  return <div key={index} ref={(el) => (refs.current[`${index}-${i}`] = el)} className='letter'>
                    {y}
                    <div style={{display: selectedElement?.id === `${index}-${i}` ? 'flex':'none'}}></div>

                  </div>} 
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
}
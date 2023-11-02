import './EscritorDatosPage.css'
import ShowWords from './ShowWords'
import TableKeyboard from './TableKeyboard'
import { useState } from 'react'
export default function EscritorDatos ( { confirmState, setConfirmState } ) {

  const [name, setName] = useState('')

  return(
    
      <div className='escritor-datos'>
        <ShowWords name={name} />
        <TableKeyboard name={name} setName={setName} confirmState={confirmState} setConfirmState={setConfirmState} />
      </div>
  )
}
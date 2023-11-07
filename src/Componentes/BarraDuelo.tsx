import { transformXP } from "../Datos/datos"
export default function BarraDuelo ( { datos } ) {

  return(
    <div>
          <div>
            <div>{datos.name}</div>
            <div>Nv{datos.Nv?datos.Nv:transformXP(datos.XP)}</div>
          </div>
          <div>
            <div>
              <div>
                <div style={{height: '100%', width: `${((datos.stats[0].base_stat - datos.HPActual)/datos.stats[0].base_stat) * 100}%`, backgroundColor: 'black', position: 'absolute', right: '0', transform: 'scaleX(-1)'}}>
                  
                </div>
              </div>
            </div>
            <div>{`${datos.HPActual}/${datos.stats[0].base_stat}`}</div>

          </div>
    </div>
  )
}
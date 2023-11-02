import './styles/MenuOptions.css'
export default function MenuOptions({ options, indexOption }) {
  console.log(options)
  return (
    <ul className='menu-options'>
      
      {options.map((option, i) => {

        if(typeof(option) === 'string') {
        return (
        <li
          className={indexOption === i ? "menu-options-active" : ""}
          key={i}
        >
          <div>{option}</div>
        </li>
      )} else if(typeof(option) === 'object') {
        return(
        option && 
        <li
          className={indexOption === i ? "menu-options-active" : ""}
          key={i}
        >
          <div>
            <p>{option.id}</p>
            <p>{option.name}</p>
            <p>{option.gender === 'V'? 'Masculino':'Femenino'}</p>
            <p>{option.time}</p>
          </div>
        </li>)
      }})
    }
    </ul>
  );
}
export default function Options ( { options, indexOption } ) {
  return(
    <ul className="options">
        {options.map((option, i) => (
          <li key={i} className={i === indexOption ? "option-active" : ""}>
            <div>{option}</div>
          </li>
        ))}
        <div style={{top:`${indexOption===0?'50px':'150px'}`}} className="flecha-selector-derecha"></div>
    </ul>
  )
  
}
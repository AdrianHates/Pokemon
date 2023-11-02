import "./styles/AskGender.css"
export default function AskGender({ options, indexOption }) {
  return (
    <ul className="ask-gender">
        {options.map((option, i) => (
          <li key={i} className={i === indexOption ? "ask-gender-active" : ""}>
            <div>{option}</div>
          </li>
        ))}
        <div style={{top:`${indexOption===0?'50px':'150px'}`}} className="flecha-selector-derecha"></div>
    </ul>
  );
}
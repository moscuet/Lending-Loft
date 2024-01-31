import { useState } from "react"
import '../userBoard/userboard.css'

const Dropdown = (props:{opts:{label:string, value:string}[], id:string, handleReturnDate:(id:string,day:string)=>void }) => {
  const {opts, handleReturnDate ,id}= props
  
  const [selectedoptsion, setSelectedoptsion] = useState(opts[0].value)
  return (
    <div>
      <select
        className="select-dropdown"
        value={selectedoptsion}
        onChange={(e) => setSelectedoptsion(e.target.value)}
      >
        {opts.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <button className="select-button" onClick={()=>handleReturnDate(id,selectedoptsion)}>confirm</button>
    </div>
  )
}
export default Dropdown

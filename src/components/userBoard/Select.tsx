//import { useState } from 'react'

import { useState } from "react"


const Dropdown = (props:{opts:{label:string, value:string}[]}) => {
  const {opts }= props
  
  const [selectedoptsion, setSelectedoptsion] = useState(opts[0].value)
  return (
    <div>
      <select
        value={selectedoptsion}
        onChange={(e) => setSelectedoptsion(e.target.value)}
      >
        {opts.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <button>confirm</button>
    </div>
  )
}
export default Dropdown

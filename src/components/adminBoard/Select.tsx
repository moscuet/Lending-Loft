import React, { useState } from "react";
import '../userBoard/userboard.css';

interface DropdownProps {
  opts: { label: string; value: string }[];
  id: string;
  disabled: boolean; 
  handleReturnDate: (id: string, day: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ opts, handleReturnDate, id, disabled }) => {
  const [selectedOption, setSelectedOption] = useState<string>(opts[0].value);

  return (
    <div>
      <select
        className="select-dropdown"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        disabled={disabled} 
      >
        {opts.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <button 
        className="select-button" 
        onClick={() => handleReturnDate(id, selectedOption)}
        disabled={disabled} 
      >
        Confirm
      </button>
    </div>
  );
};

export default Dropdown;

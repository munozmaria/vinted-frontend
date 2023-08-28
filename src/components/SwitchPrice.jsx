import React, { useState } from "react";
import Switch from "react-switch";

const SwitchPrice = ({ sortedPrice, setSortedPrice }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <label>
      <span>Trier par prix: </span>
     

      <Switch
        onChange={() => {
          handleChange();
          setSortedPrice(!sortedPrice);
        }}
        checked={checked}
      
        className={checked? "react-switch-handle::after" : "react-switch-handle::before"}
        
      />


    </label>
  );
};

export default SwitchPrice;

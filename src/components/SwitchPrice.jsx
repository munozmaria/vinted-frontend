import React, { useState } from "react";
import Switch from "react-switch";

const SwitchPrice = ({ sortedPrice, setSortedPrice }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    setSortedPrice(!sortedPrice);
  };

  return (
    <label>
      <span>Trier par prix: </span>
      <Switch
        onChange={handleChange}
        checked={checked}
        className={`custom-switch ${checked ? "checked" : ""}`}
      />


    </label>
  );
};

export default SwitchPrice;

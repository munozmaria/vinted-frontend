import React, { useState } from "react";
import Switch from "react-switch";

const SwitchPrice = ({ sortedPrice, setSortedPrice }) => {
  const [checked, setChecked] = useState(sortedPrice === "price-desc");

  const handleChange = () => {
    const newSortedPrice = checked ? "price-asc" : "price-desc";
    setChecked(!checked);
    setSortedPrice(newSortedPrice);
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

import { useState } from "react";
import { Range } from "react-range";

const RangeRate = ({ setRangePriceOffers }) => {
  const [valuesRange, setValuesRange] = useState([10, 100]);

  return (
    <Range
      step={5}
      min={0}
      max={500}
      values={valuesRange}
      onChange={(values) => {
        setValuesRange(values);
        setRangePriceOffers(values);
      }}
      renderTrack={({ props, children }) => {
        // console.log(children);
        return (
          <div
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "50%",
            }}>
            <div key={props.id}
              {...props}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                backgroundColor: "rgb(168 184 185)",

                alignSelf: "center",
              }}>
              {children}
            </div>
          </div>
        );
      }}
      renderThumb={({ index, props }) => {
        return (
          <>
            <div
              {...props}
              style={{
                ...props.style,
                height: "22px",
                width: "22px",
                backgroundColor: "#2cb1ba",
                borderRadius: "50%",
                outline: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <div
                style={{
                  position: "absolute",
                  top: "-28px",
                  color: "#fff",
                  fontSize: "12px",
                
                  padding: "4px",
                  borderRadius: "4px",
                  backgroundColor: "#2cb1ba",
                }}>
                {valuesRange[index]}€
              </div>
            </div>
          </>
        );
      }}
    />
  );
};

export default RangeRate;

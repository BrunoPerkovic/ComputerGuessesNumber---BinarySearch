import React from "react";
const GameOption = ({ handleFunction, value, className }) => {
  return (
    <button
      href="#"
      className={className}
      onClick={() => {
        handleFunction(value);
      }}
    >
      {value.toUpperCase()}
    </button>
  );
};

export default GameOption;

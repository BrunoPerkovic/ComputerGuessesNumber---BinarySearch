import React from "react";
import "./GameOption.scss";
const GameOption = ({ handleFunction, value }) => {
  return (
    <a
      href="#"
      className="gameOption"
      onClick={() => {
        handleFunction(value);
      }}
    >
      {value.toUpperCase()}
    </a>
  );
};

export default GameOption;

import React from "react";
import "./GameOption.scss";
const GameOption = ({ handleGameOption, value }) => {
  return (
    <div
      className="gameOption"
      onClick={() => {
        handleGameOption(value);
      }}
    >
      {value.toUpperCase()}
    </div>
  );
};

export default GameOption;

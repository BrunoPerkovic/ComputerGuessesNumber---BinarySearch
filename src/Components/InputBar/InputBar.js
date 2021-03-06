import React from "react";

const InputBar = ({ value, onChangeFunction, onKeyUpFunction }) => {
  return (
    <input
      type="number"
      className="inputbar"
      onChange={onChangeFunction}
      onKeyUp={onKeyUpFunction}
    ></input>
  );
};

export default InputBar;

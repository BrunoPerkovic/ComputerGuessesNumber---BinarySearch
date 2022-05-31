import "./App.scss";
import GameOption from "./Components/GameOption/GameOption";
import InputBar from "./Components/InputBar/InputBar";
import React, { useState } from "react";

function App() {
  const [playerInput, setPlayerInput] = useState(0);
  const [arrayRange, setArrayRange] = useState(0);
  const [chosenNumber, setChosenNumber] = useState(0);
  const [lastGuessedNumber, setLastGuessedNumber] = useState(0);
  const [startOfRange, setStartOfRange] = useState(1);
  const [endOfRange, setEndOfRange] = useState(0);
  const [computerNumberOfGuesses, setComputerNumberOfGuesses] = useState(0);
  const [seeIfPlayerIsLying, setSeeIfPlayerIsLying] = useState(false);

  function range(size, startAt = 1) {
    let niz = [];
    for (let i = 0; i < size; i++) {
      niz.push(i);
    }
    return niz;
  }

  function checkLie(chosenNumber, lastGuessedNumber, option) {
    if (option === "high" && lastGuessedNumber <= chosenNumber) {
      setSeeIfPlayerIsLying(true);
      return true;
    } else if (option === "low" && lastGuessedNumber >= chosenNumber) {
      setSeeIfPlayerIsLying(true);
      return true;
    } else if (option === "correct" && lastGuessedNumber !== chosenNumber) {
      setSeeIfPlayerIsLying(true);
      return true;
    } else {
      setSeeIfPlayerIsLying(false);
      return false;
    }
  }

  const handlePlayerInput = (e) => {
    setPlayerInput(e.target.value);
  };

  const handleArrayRange = (e) => {
    if (e.key === "Enter") {
      setArrayRange(range(playerInput));
      setEndOfRange(parseInt(playerInput));
    }
  };

  const handleChosenNumber = (e) => {
    setChosenNumber(parseInt(e.target.value));
  };

  function checkIfNumberInRange(range, number) {
    return range.includes(parseInt(number));
  }

  const handleNumberInRange = (e) => {
    if (e.key === "Enter") {
      let check = checkIfNumberInRange(arrayRange, chosenNumber);
      if (check === false) {
        alert("Unešeni broj nije u odabranom rangeu");
        setChosenNumber(0);
        return;
      }
    }
  };

  const generateNumber = (endPoint, startingPoint) => {
    let midPoint = Math.floor((startingPoint + endPoint) / 2);
    setLastGuessedNumber(midPoint);
  };

  const handleGameOption = (option) => {
    if (checkLie(chosenNumber, lastGuessedNumber, option)) {
      alert("CHEATING! DONT TELL ME WRONG NUMBER!");
      return;
    }

    if (option === "high") {
      setEndOfRange(lastGuessedNumber - 1);
      generateNumber(lastGuessedNumber - 1, startOfRange);
      setComputerNumberOfGuesses(computerNumberOfGuesses + 1);
    } else if (option === "low") {
      setStartOfRange(lastGuessedNumber + 1);
      generateNumber(endOfRange, lastGuessedNumber + 1);
      setComputerNumberOfGuesses(computerNumberOfGuesses + 1);
    } else if (option === "correct") {
      setComputerNumberOfGuesses(computerNumberOfGuesses + 1);

      alert(
        "I win!!! Yupi. It took me : " +
          computerNumberOfGuesses +
          " tries :) :) :)"
      );
      resetStatesToDefault();
      return;
    }
  };

  function resetStatesToDefault() {
    setPlayerInput(0);
    setArrayRange(0);
    setChosenNumber(0);
    setComputerNumberOfGuesses(0);
    setEndOfRange(0);
    setStartOfRange(1);
    setLastGuessedNumber(0);
  }

  return (
    <div className="app">
      <div className="rangeGeneratorContainer">
        <div className="text">
          Insert a number which will be the length of range:
        </div>
        <InputBar
          onChangeFunction={handlePlayerInput}
          onKeyUpFunction={handleArrayRange}
        />
      </div>

      <div className="text">
        This range goes from {arrayRange[0]} to{" "}
        {arrayRange[arrayRange.length - 1]}
      </div>

      <div className="guessedNumberContainer">
        <div className="text">Insert a number you want computer to guess:</div>
        <InputBar
          value={"number"}
          onChangeFunction={handleChosenNumber}
          onKeyUpFunction={handleNumberInRange}
        />
      </div>

      <div className="text">
        Number you choose for computer to guess is {chosenNumber}
      </div>

      <button
        onClick={() => {
          generateNumber(endOfRange, startOfRange);
        }}
      >
        START GAME
      </button>

      <div>{seeIfPlayerIsLying && <div>CHEATING!</div>}</div>

      <div className="text">
        Click on one of below available options so you can guide computer to
        guess the correct number.
      </div>

      <div className="gameOptionsContainer">
        <GameOption value={"low"} handleFunction={handleGameOption} />
        <GameOption value={"high"} handleFunction={handleGameOption} />
        <GameOption value={"correct"} handleFunction={handleGameOption} />
      </div>

      <div className="text">
        Computer guessed this number: {lastGuessedNumber}
      </div>

      <div className="text">I am on my {computerNumberOfGuesses}. try</div>
    </div>
  );
}

export default App;

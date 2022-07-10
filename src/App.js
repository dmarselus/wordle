import "./styles.css";
import React, { useState, useEffect } from "react";

const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(new Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isFinal, setIsFinal] = useState(-1);

  useEffect(() => {
    const handleType = (event) => {
      console.log(event.keycode);
      if (event.key === "Backspace") {
        console.log({ currentGuess });
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      } else if (event.key === "Enter" && currentGuess.length === 5) {
        let currIndex = isFinal + 1;
        let tempGuesses = [...guesses];
        tempGuesses[currIndex] = currentGuess;

        setGuesses(tempGuesses);
        setIsFinal(currIndex);
        setCurrentGuess("");
        setIsFinal(isFinal + 1);
        return;
      } else if (currentGuess.length < 6 && event.key.match(/^[A-Za-z]+$/)) {
        console.log("3");
        setCurrentGuess((oldGuess) => oldGuess + event.key[0]);
        return;
      }
    };

    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess]);

  async function fetchNewSolution() {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setSolution(result[Math.floor(Math.random() * result.length)]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNewSolution();
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandboxsss</h1>
      <h2>{solution}</h2>
      <h2>{currentGuess}</h2>
      <h2>{isFinal}</h2>
      {guesses.map((item, index) => {
        let isCurrIndex = index === guesses.indexOf(null);
        return (
          <Row
            keyProp={index}
            guess={isCurrIndex ? currentGuess : item ?? ""}
            isFinal={isFinal}
          />
        );
      })}
    </div>
  );
}

function Row({ guess, keyProp, isFinal }) {
  let box = [];

  for (let i = 0; i < 5; i++) {
    box.push(guess[i] ?? "");

    if (isFinal) {
    }
  }

  return (
    <div key={keyProp} className="rowContainer">
      {box.map((word, index) => {
        return (
          <div key={index} className="box correct">
            {word}
          </div>
        );
      })}
    </div>
  );
}

import "./styles.css";
import React, { useState, useEffect } from "react";

const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(new Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  // const [guesses, setGuesses] = useState(['asdasd']);

  function check() {
    console.log("todo");
  }

  useEffect(() => {
    const handleType = (event) => {
      if (event.key === "Backspace") {
        console.log({ currentGuess });
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      } else if (event.key === "Enter") {
        console.log("2");
        check();
        return;
      }
      // event.key.match(/^[A-Za-z]+$/)
      console.log("3");
      setCurrentGuess((oldGuess) => oldGuess + event.key);
      return;
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
      <h2>{guesses.length}</h2>
      {guesses.map((item, index) => {
        let isCurrIndex = index === guesses.indexOf(null);
        return (
          <Row
            keyProp={index}
            guess={isCurrIndex ? currentGuess : item ?? ""}
          />
        );
      })}
    </div>
  );
}

function Row({ guess, keyProp }) {
  let box = [];

  for (let i = 0; i < 6; i++) {
    box.push(guess[i] ?? "");
  }
  // console.log(box);

  return (
    <div
      key={keyProp}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
      }}
    >
      {box.map((word, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              margin: 5,
              padding: 25,
              borderWidth: 1,
              borderColor: "black",
              background: "red"
            }}
          >
            {word}
          </div>
        );
      })}
    </div>
  );
}

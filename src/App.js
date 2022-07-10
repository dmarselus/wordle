import "./styles.css";
import React, { useState, useEffect } from "react";

const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(new Array(6).fill(null));

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
      <h2>{guesses.length}</h2>
      {guesses.map((item) => (
        <Row guess={item ?? ""} />
      ))}
    </div>
  );
}

function Row({ guess }) {
  return <h1>{guess}</h1>;
}

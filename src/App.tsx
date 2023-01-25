import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from './wordList.json'
import './App.css'

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const isLoser = incorrectLetters.length >= 6;//only have 6 parts to show
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter));


  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isLoser, isWinner])

  // function addGuessedLetter(letter: string) {
  //   if (guessedLetters.includes(letter)) return;
  //   setGuessedLetters(currentLetters => [...currentLetters, letter]);
  // }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      //if the key is not [a-z] ignore and do nothing
      if (!key.match(/^[a-z]$/)) return;

      //if the key is [a-z], add it to the guessedLetter
      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      //if the key is not Enter, do nothing
      if (key !== 'Enter') return;

      //if the key is Enter, get a new word and start a new game.
      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, [])

  return (
    <div className="container">
      <div className="message">
        {isWinner && "Winner! - Refresh to try again!"}
        {isLoser && "Nice Try! - Refresh to try again!"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter} />
      </div>
    </div>
  )
}

export default App;

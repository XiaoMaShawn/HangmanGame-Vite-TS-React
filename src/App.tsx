import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from './wordList.json'
import './App.css'

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  })
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters])

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

  // console.log(wordToGuess);

  return (
    <div className="container">
      <div className="message">
        win/lose
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard />
      </div>
    </div>
  )
}

export default App;

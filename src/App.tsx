import { useState } from "react"
import words from './wordList.json'

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  })

  console.log(wordToGuess);

  return (
    <div className="container">Hi

    </div>
  )
}

export default App

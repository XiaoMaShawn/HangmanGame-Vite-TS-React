type HangmanWordProps = {
  reveal?: boolean,
  guessedLetters: string[],
  wordToGuess: string
}

export function HangmanWord({ reveal = false, guessedLetters, wordToGuess }: HangmanWordProps) {
  return <div style={{ display: 'flex', gap: '.25em', fontSize: '6rem', fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'monospace' }}>
    {/* show the underline based on the word letter NO. */}
    {wordToGuess.split('').map((letter, index) => (
      <span style={{ borderBottom: '.1em solid black' }} key={index}>
        {/* show the letter if it is been guessed */}
        <span style={{ visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden', color: !guessedLetters.includes(letter) && reveal ? "red" : "black" }}>{letter}</span>
      </span>
    ))}
  </div>
}
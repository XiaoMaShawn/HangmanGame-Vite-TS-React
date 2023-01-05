export function HangmanWord() {
  const word = 'test';
  const guessedLetters = ['t'];

  return <div style={{ display: 'flex', gap: '.25em', fontSize: '6rem', fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'monospace' }}>
    {/* show the underline based on the word letter NO. */}
    {word.split('').map((letter, index) => (
      <span style={{ borderBottom: '.1em solid black' }} key={index}>
        {/* show the letter if it is been guessed */}
        <span style={{ visibility: guessedLetters.includes(letter) ? 'visible' : 'hidden' }}>{letter}</span>
      </span>
    ))}
  </div>
}
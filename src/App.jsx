import React, {useEffect, useState} from "react";
import toast, { Toaster } from "react-hot-toast";
import Game from "./Components/Game";
import NavBar from "./Components/NavBar";
import words from "./words.json";

// const WORDS_API = "https://raw.githubusercontent.com/learncodeacademy/wordle-react/main/words.json";
function App() {

  const [levelDiff, setLevelDiff]  = useState(6);
  const [guesses, setGuesses] = useState(Array(levelDiff).fill(null))
  const [currGuess, setCurrGuess] = useState('');
  const [gameFinish, setGameFinish]  = useState(false);
  const [answer, setAnswer] = useState(fetchWord());
  const [counter, setCount]  = useState(0);
  
  function fetchWord()
  {
    const randWord = words[Math.floor(Math.random() * words.length)]
    console.log(randWord);
    return randWord
  }

  useEffect (() =>
  {
    const handleKeypress = (event) =>
    {
      if(gameFinish)
      {
        return;
      }
      if(counter  === levelDiff)
      {
        toast.error("You Lose!")
        return;
      }
      if(event.key === 'Enter')
      {
        if(currGuess.length !== 5)
        {
          toast.error("Not long enough!");
          return;
        }
        if(words.includes(currGuess))
        {
          const newGuesses = [...guesses];
          newGuesses[guesses.findIndex(guess => guess == null)] = currGuess;
          setGuesses(newGuesses);
          setCurrGuess('');
  
          const matchAnswer = answer === currGuess;
          if(matchAnswer)
          {
            toast.success("You Win!");
            setGameFinish(true);
            setCount(counter + 1);
            return;
          }
          setCount(counter + 1);
        }
        else
        {
          toast.error("Word does not exist!");
          return;
        }
      }
      if(event.key === 'Backspace')
      {
        setCurrGuess(currGuess.slice(0,-1));
        return;
      }
      if(event.key === ' ')
      {
        return;
      }
      if(currGuess.length > 5)
      {
        toast.error("Too many letters");
        return;
      }
      if(event.key.match(/^[a-z]{1}$/) != null)
      {
        setCurrGuess(currGuess+event.key);
      }
    }
    window.addEventListener('keydown', handleKeypress);
     
    return () => window.removeEventListener('keydown', handleKeypress);
  },[currGuess, gameFinish, guesses, answer, levelDiff, counter])

  function restartGame(diff)
  {
    setLevelDiff(diff);
    setAnswer(fetchWord());
    setCurrGuess('');
    setGameFinish(false);
    setCount(0);
    setGuesses(Array(diff).fill(null));
  }

  // function handleDiff(diff) 
  // {
  //   setLevelDiff(diff);
  //   restartGame();
  // }
  
  return (
    <div className="">
      <div>
        <Toaster/>
      </div>
      <NavBar/>
      <br/>
      <br/>
      <br/>
      <div className="flex flex-col items-center bg-gradient-to-b h-screen from-black to-blue-400 mb-5 mr-5">
        <Game className="fixed" currentGuess = {currGuess} guesses = {guesses} answer = {answer}/>
        <div className="flex flex-col">
          <button className="bg-gradient-to-t from-blue-400 to-white" onClick={() => restartGame(levelDiff)}>Restart</button>
          <br/>
          <button className="bg-gradient-to-t from-blue-400 to-white" onClick={() => restartGame(6)}>Easy</button>
          <br/>
          <button className="bg-gradient-to-t from-blue-400 to-white" onClick={() => restartGame(5)}>Medium</button>
          <br/>
          <button className="bg-gradient-to-t from-blue-400 to-white" onClick={() => restartGame(4)}>Hard</button>
        </div>
      </div>
    </div>
  );
}
export default App;

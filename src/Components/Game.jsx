import React from "react";
import './Game.css'

class Game extends React.Component {
    render()
    {
        var guesses = this.props.guesses;
        var currentGuess = this.props.currentGuess;
        return (
            guesses.map((guess,i) => 
            {
                const isCurr = i === guesses.findIndex(guess => guess == null)
                return (
                    <div>
                        <Row guess = {isCurr ? currentGuess : guess ?? ""} isActual = {!isCurr && guess != null} answer = {this.props.answer}/>
                    </div>
                );
            })
        )
    }
}

function Row({guess, isActual, answer })
{
    const row_tiles = [];

    for(let ind = 0; ind < 5; ind ++)
    {
        const char = guess[ind];
        let className = 'tile';
        if (isActual)
        {
            if(answer[ind] === char)
            {
                className = 'tile-correct'
            }
            else if(answer.includes(char))
            {
                className = 'tile-partial'
            }
            else
            {
                className = 'tile-incorrect'
            } 
        }
        row_tiles.push(<div key={ind} className={className}>{char}</div>)
    }
    return (
        <div className="row">
            {row_tiles}
        </div>
    )

}
export default Game

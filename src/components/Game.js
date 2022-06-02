import React, { useState } from 'react'
import Board from './Board'
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function calculateWinner(squares) {
  let winner = null
  winningPatterns.forEach((winningPattern) => {
    const [a, b, c] = winningPattern
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      winner = {winningPattern, winningLetter: squares[a]}
    }
  })
  return winner
}

function getPlacementLetter(isX) {
  return isX ? 'X' : 'O'
}

function allTilesAreFilled(array) {
  return array.every((val) => val !== null)
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [isX, setIsX] = useState(true)
  const [currentStep, setCurrentStep] = useState(history.length - 1)
  const current = history[currentStep]
  const winner = (currentStep === history.length - 1) ? calculateWinner(current) : null
  
  const onTakeTurn = (id) => {
    if (winner || currentStep !== history.length-1 || current[id]) return;
    const newSquares = current.slice()
    newSquares[id] = getPlacementLetter(isX)
    const newHistory = history.slice()
    newHistory.push(newSquares)
    setHistory(newHistory)
    setIsX(!isX)
    setCurrentStep(currentStep+1)
  }

  const resetGame = () => {
    setHistory([Array(9).fill(null)])
    setIsX(true)
    setCurrentStep(0)
  }

  const decrementHistory = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep-1)
    setIsX(!isX)
  }

  const incrementHistory = () => {
    if (currentStep === history.length-1) return;
    setCurrentStep(currentStep+1)
    setIsX(!isX)
  }

  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      {winner && winner.winningLetter &&
        <h1 className='mb-5 text-5xl'>{winner.winningLetter} Wins! </h1>
      }
      {
        !winner && allTilesAreFilled(current) &&
        <h1 className='mb-5 text-5xl'>It's a tie! </h1>
      }
      {
        !winner && !allTilesAreFilled(current) &&
        <h1 className='mb-5 text-5xl'>{getPlacementLetter(isX)}'s Turn</h1>
      }
      <Board 
        squares={current} 
        onTakeTurn={onTakeTurn}
        winner={winner}
      />
      <div className="flex flex-row mt-3 space-x-2">
        <button 
          className='w-10 p-3 text-2xl text-white shadow-lg rounded-lg bg-blue-600'
          onClick={decrementHistory}
        >
          {'<'}
        </button>
        <button 
          className='w-40 p-3 text-2xl text-white shadow-lg rounded-lg bg-yellow-500' 
          onClick={resetGame}
        >
          Play Again!
        </button>
        <button 
          className='w-10 p-3 text-2xl text-white shadow-lg rounded-lg bg-blue-600'
          onClick={incrementHistory}
        >
          {'>'}
        </button>
      </div>
    </div>
    
  )

}

export default Game;
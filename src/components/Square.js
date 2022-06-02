import React from 'react'


function Square({ id, value, onTakeTurn, winner }) {
  const isInWinningPattern = winner && winner.winningPattern && winner.winningPattern.includes(id)
  return (
    <div 
      onClick={() => onTakeTurn(id)} 
      className=
      {
        `flex h-32 w-32 items-center justify-center box-border hover:bg-gray-50 text-6xl
        ${isInWinningPattern ? 'border-8 border-double border-amber-300' : 'border-2 border-gray-300'}`
      }
    >
      {value}
    </div>
  )
}

export default Square
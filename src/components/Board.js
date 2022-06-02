import React, { useState } from 'react'
import Square from './Square'


function Board( { squares, onTakeTurn, winner}) {
  return (
    <div className="grid grid-cols-3 drop-shadow-md">
      {squares.map((val, i) => 
        <Square 
          key={i} 
          id={i} 
          value={val} 
          winner={winner} 
          onTakeTurn={onTakeTurn}
        />)}
    </div>
  )
}

export default Board
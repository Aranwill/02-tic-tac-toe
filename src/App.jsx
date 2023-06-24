import { useState } from "react"

const TURNS = {
  X: '❌',
  O: '⚪'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const Square = ({ children, isselected, updateBoard, index }) => {
  const className= `square ${isselected ? 'is-selected' : ''}`


  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}



function App() {
  const [board, setBoard ]= useState(
    Array(9).fill(null)
    )

    const [turn, setTurn] = useState(TURNS.X)
    // Null es que no hay ganador, false es que hay un empate
    const [winner, setWinner] = useState(null)

    const checkWinner = (boardToCheck) => {
      // revisamos todas las combinaciones ganadoras para ver si X u O gano 
      for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo 
        if (
          boardToCheck[a] &&
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c] 
        ) {
          return boardToCheck[a]
        }
      }
      // Si no hay ganador
      return null
    }
    
    const updateBoard = (index) => {
      //No actualiza esta posicion si ya tiene algo
      if ( board[index] || winner) {
        return
      }
      //Actualizar el tablero
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      //Cambiar el turno 
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)
      const newWinner = checkWinner(newBoard)
      if (newWinner) {
        setWinner(newWinner)
      }
    }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
              {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isselected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isselected= {turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
  )
}

export default App

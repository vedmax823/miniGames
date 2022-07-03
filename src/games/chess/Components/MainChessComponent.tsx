import React, {FC, useEffect, useState} from 'react';

import { BoardChess } from '../Models/BoardChess';
import BoardChessComponent from './BoardChessComponent';
import '../styles/style_chess.css'
import { Colors } from '../Models/Colors';
import { Player } from '../Models/Player';

const MainChessComponent : FC = () => {
    const [board, setBoard] = useState(new BoardChess())

    
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);


    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }
    

    function startNewGame(){
        const newBoard = new BoardChess()
        newBoard.init_cells()
        newBoard.addFigures()
        setBoard(newBoard)
    } 

    

    useEffect(() => {
        startNewGame()
        setCurrentPlayer(whitePlayer);
    }, [])


    return (
        <div>
            <BoardChessComponent 
                board = {board}
                setBoard = {setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}

            />
        </div>
    );
};

export default MainChessComponent;
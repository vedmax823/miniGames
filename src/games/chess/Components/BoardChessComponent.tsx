import React, {FC, useEffect, useState} from 'react';
import { BoardChess } from '../Models/BoardChess';
import { CellChess } from '../Models/CellChess';
import { Colors } from '../Models/Colors';
import { FigureChess, FigureNames } from '../Models/Figures/FigureChess';
import { Queen } from '../Models/Figures/Queen';
import { Player } from '../Models/Player';
import CellChessComponent from './CellChessComponent';
import white_queen_logo from '../assets/white-queen.png'
import white_rook_logo from '../assets/white-rook.png'
import white_knight_logo from '../assets/white-knight.png'
import white_bishop_logo from '../assets/white-bishop.png'
import black_queen_logo from '../assets/black-queen.png'
import black_rook_logo from '../assets/black-rook.png'
import black_knight_logo from '../assets/black-knight.png'
import black_bishop_logo from '../assets/black-bishop.png'
import { Rook } from '../Models/Figures/Rook';
import { Knight } from '../Models/Figures/Knight';
import { Bishop } from '../Models/Figures/Bishop';


// import '../styles/style_chess.css'

interface BoardProps{
    board : BoardChess,
    setBoard : (board : BoardChess) => void,
    currentPlayer: Player | null;
    swapPlayer: () => void;
}



const BoardChessComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<CellChess | null>(null);
    const [additionFigure, setAdditionanFigure] = useState({white : false, black : false})
    const [movingCell, setMovingCell] = useState<CellChess | null>(null)

    function click(cell: CellChess) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell) && (cell.figure?.name !== FigureNames.KING)) {
            if (selectedCell.moveFigure(cell)){
                if ((cell.figure?.name === FigureNames.PAWN) && (cell.y === 0) || (cell.y === 7)){
                    showAdditionFigure(cell.figure?.color!, cell)
                }
                else swapPlayer()
            }
            setSelectedCell(null);
            updateBoard()
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function showAdditionFigure(color : Colors, cell : CellChess){
        color === Colors.BLACK ? setAdditionanFigure({...additionFigure, black : true}) : setAdditionanFigure({...additionFigure, white : true})
        setMovingCell(cell)
    }

    function createfigureAndUpdate(figure : FigureChess, cell : CellChess){
        cell.setFigure(figure)
        setAdditionanFigure({black : false, white : false})
        swapPlayer()
        updateBoard()
    }

    function createNewFigure(name : FigureNames, color : Colors, cell : CellChess){
        if (FigureNames.QUEEN === name) {
            createfigureAndUpdate(new Queen(color, cell), cell)   
        }
        if (FigureNames.ROOK === name){
            createfigureAndUpdate(new Rook(color, cell), cell)
        }
        if (FigureNames.KNIGHT === name){
            createfigureAndUpdate(new Knight(color, cell), cell)
        }
        if (FigureNames.BISHOP === name){
            createfigureAndUpdate(new Bishop(color, cell), cell)
        }  
    }

    useEffect(() => {
        showCells()
    }, [selectedCell])

    function showCells() {
        board.findCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    
    
    return (
        <div className="board_chess">
            {
                board.cells.map(row =>
                    row.map(cell =>
                        <CellChessComponent cell={cell} key={cell.id} click={click}/>
                    )
                )
            }
            {additionFigure.white && movingCell && 
                <div className="choose_figure_white">
                    <div className="cell_chess" onClick={() => createNewFigure(FigureNames.QUEEN, Colors.WHITE, movingCell)}><img src={white_queen_logo} alt=""/></div>
                    <div className="cell_chess" onClick={() => createNewFigure(FigureNames.ROOK, Colors.WHITE, movingCell)}><img src={white_rook_logo} alt=""/></div>
                    <div className="cell_chess" onClick={() => createNewFigure(FigureNames.KING, Colors.WHITE, movingCell)}><img src={white_knight_logo} alt=""/></div>
                    <div className="cell_chess" onClick={() => createNewFigure(FigureNames.BISHOP, Colors.WHITE, movingCell)}><img src={white_bishop_logo} alt=""/></div>
                </div>
            } 
            {additionFigure.black && movingCell && 
                <div className="choose_figure_white">
                    <div className="cell_chess" onClick={() => createNewFigure(FigureNames.QUEEN, Colors.BLACK, movingCell)}><img src={black_queen_logo} alt=""/></div>
                    <div className="cell_chess" onClick={() => createNewFigure(FigureNames.ROOK, Colors.BLACK, movingCell)}><img src={black_rook_logo} alt=""/></div>
                    <div className="cell_chess" onClick={() => createNewFigure(FigureNames.KING, Colors.BLACK, movingCell)}><img src={black_knight_logo} alt=""/></div>
                    <div className="cell_chess" onClick={() => createNewFigure(FigureNames.BISHOP, Colors.BLACK, movingCell)}><img src={black_bishop_logo} alt=""/></div>
                </div>
            }        
        </div>
    );
};

export default BoardChessComponent;
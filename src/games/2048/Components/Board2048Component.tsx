import React, {FC, useState} from 'react';

import { Board2048 } from '../models/Board2048';
import '../styles/main2048.css'

const Board2048Component : FC = () => {

    const [board, setBoard] = useState(new Board2048())
    

    document.onkeyup = function(e){
        switch (e.key) {
            case "ArrowUp":
                    board.up()
                    board.getRandomCell()
                    setBoard(board.getCopyBoard(board.cells))
                break;

            case "ArrowDown":
                    board.down()
                    board.getRandomCell()
                    setBoard(board.getCopyBoard(board.cells))
                break;
            
            case "ArrowLeft":
                    board.left()
                    board.getRandomCell()                    
                    setBoard(board.getCopyBoard(board.cells))
                break;
            
            case "ArrowRight":
                    board.right()
                    board.getRandomCell()
                    setBoard(board.getCopyBoard(board.cells))
                break;
        
            default:
                break;
        }
    }

       
    
    return (
        <div className="main_board" >
            {
                board.cells.map(row => 
                    row.map(cell => 
                        <div className="cell2048" key={cell.id} onClick={()=>console.log(cell)}>
                            {cell.value && <div className={['div_cell', `color_cell${cell.value}`].join(' ')}>{cell.value}</div>}
                            
                        </div>
                    )
                )
            }            

            
        </div>
    );
};

export default Board2048Component;
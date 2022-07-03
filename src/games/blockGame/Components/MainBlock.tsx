import React, { createContext, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newBoard, setBoard } from '../../../slicers/boardSlice';
import { RootState } from '../../../store/store';
import { Board } from '../models/Board';
import '../style/blockStyle.css'
import BlockElements from './BlockElements';
import BoardComponent from './BoardComponent';




interface BoardProps {
    board: Board;    
}


export const BoardContext = createContext<BoardProps | null>(null);

const MainBlock = () => {   

    const [board, setBoardS] = useState(useSelector((state : RootState) => state.board.board))
    const [bestScoreBlock, setBestScoreBlock] = useState(0)

    const count = useSelector((state : RootState) => state.count.count)
    
    const dispach = useDispatch()


 

    useEffect(() => {
        restart()
        //console.log(board)
    }, [])

    useEffect(() => {
        let best = localStorage.getItem('bestScoreBlock')
        if (best == null) {
            localStorage.setItem('bestScoreBlock', bestScoreBlock.toString())
            best = bestScoreBlock.toString()
        }
        setBestScoreBlock(parseInt(best))

        if (count > parseInt(best)){
           
            localStorage.setItem('bestScoreBlock', count.toString())
            setBestScoreBlock(count)
        }

    },[count])
    
    function restart() {
        const newBoard = new Board();
        newBoard.initBigCells()
        setBoardS(newBoard)
        dispach(setBoard(newBoard))
    }
    return ( 
        
            <div className="d-flex col-12 flex-column">
                <div className="d-flex justify-content-center flex-column scoreBest">
                    <div className="d-flex justify-content-center"><h3>Найкращий</h3></div>
                    <div className="d-flex justify-content-center"><h1>{bestScoreBlock}</h1></div>
                </div>
                <div className="d-flex justify-content-center flex-column scoreDiv">
                    <div className="d-flex justify-content-center"><h3>Очки</h3></div>
                    <div className="d-flex justify-content-center"><h1>{count}</h1></div>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <div className="main-block">
                        <BoardComponent/>
                    </div>
                </div>
                <div className="block_elements d-flex justify-content-center">
                    <BlockElements />
                </div>
            </div>
        
        
    );
};

export default MainBlock;
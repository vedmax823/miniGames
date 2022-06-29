import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFigure } from '../../../slicers/figureListSlice';
import { RootState } from '../../../store/store';
import { Board } from '../models/Board';
import { FigureList } from '../models/FigureList';
import { Figure } from '../models/figures/Figure';
import { Modal, Button } from 'react-bootstrap';


import OneFigureComponent from './OneFigureComponent';
import { setBoard } from '../../../slicers/boardSlice';
import { newCount } from '../../../slicers/counterSlicer';

interface FigureListContextInterface {
    figureList : FigureList    
}



export const FigureListContext = createContext<FigureListContextInterface | null>(null);
const BlockElements = () => {
    const dispatch = useDispatch()
    const count = useSelector((state : RootState) => state.count.count)

    const figureList : FigureList = useSelector((state : RootState) => state.figureList.figureList)
    const board : Board = useSelector((state : RootState) => state.board.board)
    
    const [gameOver, setGameOver] = useState(false)
    //let figureList : FigureList = new FigureList()

    const [figure1, setFigure1] = useState<Figure | undefined>()
    const [figure2, setFigure2] = useState<Figure | undefined>()
    const [figure3, setFigure3] = useState<Figure | undefined>()
    
    
    useEffect(() => {
        let figure1 = figureList.figureArr[0]
        if (figure1 !== undefined) figure1!.canMove = board.checkPossibleMove(figure1!)
        let figure2 = figureList.figureArr[1]
        if (figure2 !== undefined) figure2!.canMove = board.checkPossibleMove(figure2!)
        let figure3 = figureList.figureArr[2]
        if (figure3 !== undefined) figure3!.canMove = board.checkPossibleMove(figure3!)
        
        setFigure1(figure1)
        setFigure2(figure2)
        setFigure3(figure3)
        setGameOver(!figureList.isGameOver())
        


    }, [figureList, board])

    

    
    const handleClose = () => {
        setGameOver(false);
        const newBoard = new Board()
        newBoard.initBigCells()
        dispatch(setBoard(newBoard))
        const newFigureList = new FigureList()
        dispatch(setFigure(newFigureList))
        dispatch(newCount())
    }
   

    
    //console.log(figure1, figure2, figure3)
    

    return (
        <div>
            <FigureListContext.Provider value={{figureList}}>
                <div className="d-flex justify-content-around col-12">

                    <div className="contaeiner_for_element d-flex justify-content-center align-items-center">
                        {figure1 && figure1.is_visible && <OneFigureComponent figure={figure1} num={0}/>}                     
                    </div>
                    <div className="contaeiner_for_element d-flex justify-content-center align-items-center">
                        {figure2 && figure2.is_visible && <OneFigureComponent figure={figure2} num={1}/>} 
                    </div>
                    <div className="contaeiner_for_element d-flex justify-content-center align-items-center">
                        {figure3 && figure3.is_visible && <OneFigureComponent figure={figure3} num={2}/>} 
                    </div>
                                
                </div>
                
            </FigureListContext.Provider>
            <Modal show={gameOver} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Гра завершена</Modal.Title>
                </Modal.Header>
                <Modal.Body>Ваш результат : <h5>{count}</h5></Modal.Body>
                <Modal.Footer>
                
                <Button variant="primary" onClick={handleClose}>
                    Почати заново
                </Button>
                </Modal.Footer>
            </Modal>

        </div>


        
    );
};
//onClick={change}
export default BlockElements;
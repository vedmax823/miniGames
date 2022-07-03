import React, {FC, useContext, useEffect, useRef, useState} from 'react';

import { BoardContext } from './MainBlock';
import { updateVariableDeclarationList } from 'typescript';
import { FigureListContext } from './BlockElements';
import { useDispatch, useSelector } from 'react-redux';
import { setBoard } from '../../../slicers/boardSlice';
import { unmountComponentAtNode } from 'react-dom';
import { RootState } from '../../../store/store';
import { setFigure } from '../../../slicers/figureListSlice';
import { Figure } from '../models/figures/Figure';
import { addCount } from '../../../slicers/counterSlicer';

interface OneFiguereProps {
    figure : Figure;
    num : number;
    
}

const OneFigureComponent : FC<OneFiguereProps> = ({figure, num}) => {

    const board = useSelector((state : RootState) => state.board.board)

    

    
    

    const figureListContext = useContext(FigureListContext)
    const figureList2 = figureListContext?.figureList 

    let figureList = useSelector((state : RootState) => state.figureList.figureList)
    
    //console.log(figureList2)
    
    const ballRef = useRef<HTMLHeadingElement>(null)
    //ballRef.current!.style.display = "block"

    //console.log(`ballRef`)
    //console.log(ballRef.current)
   
    const dispatch = useDispatch()
    const handleDown = (e : any) => {
        if (!figure.canMove) return false
        const newObject = ballRef.current;
        
        let div = document.createElement("div")

        const list = div.classList;
        list.add("big_figure_div", `width_figure${figure.length}`, `height_figure${figure.height}`);

        figure.figureBrics.forEach(row => {
            row.forEach(brick => {
                let divSmall = document.createElement("div")
                brick == 0 ? divSmall.classList.add('cell_empty') : divSmall.classList.add('cell', 'cell_full')
                div.appendChild(divSmall)
            })
        })

        div.style.position = 'absolute'
        div.style.zIndex = '1000'
        const top = newObject?.getBoundingClientRect().top ?? 50
        const left = newObject?.getBoundingClientRect().left ?? 50
        div.style.top =  top - 50 + 'px'
        div.style.left = left - 50  + 'px'
        document.body.appendChild(div)
        figureList.figureArr[num]!.is_visible = false
        dispatch(setFigure(figureList))

       
        moveAtDiv(e);
        // переместим в body, чтобы мяч был точно не внутри position:relative
        //document.body.appendChild(ballRef.current!);

        //ballRef.current!.style.zIndex = '1000'; // показывать мяч над другими элементами
        const sx = ballRef.current!.getBoundingClientRect().left
        const sy = ballRef.current!.getBoundingClientRect().top
        //console.log(sx, sy)

        // передвинуть мяч под координаты курсора
        // и сдвинуть на половину ширины/высоты для центрирования
        function moveAt(e : any) {
            //console.log(e.pageX, e.pageY)
            ballRef.current!.style.left = e.pageX - ballRef.current!.offsetWidth / 2 + 'px';
            ballRef.current!.style.top = e.pageY - ballRef.current!.offsetHeight / 2 + 'px';
        }

        function moveAtDiv(e : any) {
            //console.log(e.pageX, e.pageY)
            div.style.left = e.pageX - div.offsetWidth / 2 + 'px';
            div.style.top = e.pageY - div.offsetHeight / 2 + 'px';
        }



        // 3, перемещать по экрану
        document.onmousemove = function(e) {
            moveAtDiv(e);
        }
    

        function destroyBrick(figure : Figure) {
            figureList?.removeObj(figure)
        }

        function findCellDiv() {
            const left = parseInt(div.style.left) ?? 0
            const top = parseInt(div.style.top) ?? 0
            const oneCell = board?.findCellByTopLeft(top, left)
            
            if (oneCell){
                const cellArr = board?.getCellList(oneCell, figure)
                //console.log(cellArr)

                

                if (cellArr){
                    cellArr.forEach(cell => cell.setEmpty())
                    const length = figure.getWidth()
                    dispatch(addCount(Number(length) || 0))
                    destroyBrick(figure)
                    const cnt = board?.findClearedCells()
                    dispatch(addCount((Number(cnt * 9) || 0)))
                    board?.removeFullCells()
                    const newBoard = board?.getCopyBoard()
                    dispatch(setBoard(newBoard))
                    dispatch(setFigure(figureList))
                } 
                else{
                    figureList.figureArr[num]!.is_visible = true
                    dispatch(setFigure(figureList))
                }                
            }
            else{
                figureList.figureArr[num]!.is_visible = true
                dispatch(setFigure(figureList))
            }
        }

        div.onmouseup = function() {
            findCellDiv()
            document.onmousemove = null;
            div.onmouseup = null;
            div.parentNode?.removeChild(div);
        }
        // 5. Чтоб не обрабатывался как картинка браузером
        ballRef.current!.ondragstart = function() {
            return false;
        };

        div.ondragstart = function() {
            return false;
        };
    }



    return (
        <div
            id={`id${figure.id}`} 
            ref = {ballRef}
            onMouseDown={handleDown}
            className = {['big_figure_div', `width_figure${figure.length}`, `height_figure${figure.height}`, !figure.canMove && 'opacity_class04' ].join(' ')}
            
        >
            {
                
                figure.figureBrics.map((row) => 
                    row.map((brick) =>{
                            
                            return (brick == 1) ? <div className="cell_full cell" key={Math.random()}></div> : <div className="cell_empty" key={Math.random()}></div> 
                        }
                    )
                )
            }
            
        </div>
    );
};

export default OneFigureComponent;
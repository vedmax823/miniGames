
import React, {FC} from 'react';
import { CellChess } from '../Models/CellChess';
import { Colors } from '../Models/Colors';
import { FigureNames } from '../Models/Figures/FigureChess';

interface CellProps{
    cell : CellChess,
    click: (cell: CellChess) => void;
}

const CellChessComponent : FC<CellProps> = ({cell, click}) => {

    
    return (
        
        <div
            onClick={() => click(cell)}
            className={['cell_chess', cell.color == Colors.BLACK ? 'cell_black' : 'cell_white', cell.figure?.name === FigureNames.PAWN ? 'cell_pawn' : 'cell_figure'].join(' ')}
            style={{background: cell.possible && cell.figure ? 'green' : ''}}
        >
            {cell.possible && !cell.figure && <div className={"possible"}/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
            
        </div>
    );
};

export default CellChessComponent;
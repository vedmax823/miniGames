import React, {FC} from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { BigCell } from '../models/BigCell';
import { Board } from '../models/Board';
import BigCellComponent from './BigCellComponent';
import CellComponents from './CellComponents';

interface BoardProps {
    board: Board;    
  }

const BoardComponent: FC = () => {
    
    const board = useSelector((state : RootState) => state.board.board)
    
    //console.log(board)

    return (
        
           <React.Fragment >
               
               {
                    board.bigCells.map((bigCellArr, index) =>
                        bigCellArr.map((bigCell, index) => 
                            <BigCellComponent bigCell={bigCell} key={bigCell.id}/>
                        )
                    )
               }
               
           </React.Fragment>

    );
};

export default BoardComponent;
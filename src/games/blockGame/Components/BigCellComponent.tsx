import React, {FC} from 'react';
import { BigCell } from '../models/BigCell';
import CellComponents from './CellComponents';


interface BigCellProps {
    bigCell: BigCell;
}

const BigCellComponent : FC<BigCellProps> = ({bigCell}) => {
    return (
        <div
            className="big_cell"
        >
            {
                bigCell.cells.map((row, index) =>
                    row.map((cell, index) => 
                        <CellComponents cell={cell} key={cell.id} />
                    )
                )
            }
        </div>
    );
};

export default BigCellComponent;
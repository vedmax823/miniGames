import React, {FC, useEffect, useRef} from 'react';
import {Cell} from '../models/Cell';

interface CellProps {
    cell: Cell;
}

const CellComponents : FC<CellProps> = ({cell}) => {
    const cellRef = useRef<HTMLHeadingElement>(null)
    useEffect(() => {
        cell.setLeft(cellRef.current?.getBoundingClientRect().left ?? 0)
        cell.setTop(cellRef.current?.getBoundingClientRect().top ?? 0)
    }, [])

    

    return (
        <div
            className={['cell', cell.isEmpty ? '' : 'cell_full'].join(' ')}
            ref={cellRef}
            //onMouseUp={() => console.log(cell)}
        >
        </div>
    );
};

export default CellComponents;
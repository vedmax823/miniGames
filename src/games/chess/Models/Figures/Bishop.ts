import { CellChess } from '../CellChess';
import { Colors } from '../Colors';
import { FigureChess } from './FigureChess';
import logo_white from '../../assets/white-bishop.png'
import logo_black from '../../assets/black-bishop.png' 



export class Bishop extends FigureChess{
    constructor(color : Colors,  cell : CellChess){
        super(color, cell);
        this.logo = color === Colors.WHITE ? logo_white : logo_black
    }

    canMove(target: CellChess): boolean {
        if(!super.canMove(target))
          return false;
        if(this.cell.isEmptyDiagonal(target))
          return true
        return false
    }
}
import { CellChess } from '../CellChess';
import { Colors } from '../Colors';
import { FigureChess, FigureNames } from './FigureChess';
import logo_white from '../../assets/white-queen.png'
import logo_black from '../../assets/black-queen.png' 



export class Queen extends FigureChess{
    constructor(color : Colors,  cell : CellChess){
        super(color, cell);
        this.name = FigureNames.QUEEN;
        this.logo = color === Colors.WHITE ? logo_white : logo_black
    }

    canMove(target: CellChess): boolean {
        if(!super.canMove(target))
          return false;
        if(this.cell.isEmptyVertical(target))
          return true;
        if(this.cell.isEmptyHorizontal(target))
          return true;
        if(this.cell.isEmptyDiagonal(target))
          return true;
        return false
      }
}
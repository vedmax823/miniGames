import { CellChess } from '../CellChess';
import { Colors } from '../Colors';
import { FigureChess, FigureNames } from './FigureChess';
import logo_white from '../../assets/white-knight.png'
import logo_black from '../../assets/black-knight.png' 



export class Knight extends FigureChess{
    constructor(color : Colors,  cell : CellChess){
        super(color, cell);
        this.name = FigureNames.KNIGHT;
        this.logo = color === Colors.WHITE ? logo_white : logo_black
    }

    canMove(target: CellChess): boolean {
        if(!super.canMove(target))
          return false;
        const dx = Math.abs(this.cell.i - target.i);
        const dy = Math.abs(this.cell.y - target.y);
    
        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
    }
}
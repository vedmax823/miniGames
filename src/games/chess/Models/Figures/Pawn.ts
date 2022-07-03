
import { CellChess } from '../CellChess';
import { Colors } from '../Colors';
import { FigureChess, FigureNames } from './FigureChess';
import logo_white from '../../assets/white-pawn.png'
import logo_black from '../../assets/black-pawn.png' 



export class Pawn extends FigureChess{
    
    isFirstStep: boolean = true;

    constructor(color : Colors,  cell : CellChess){
        super(color, cell);
        this.name = FigureNames.PAWN;
        this.logo = color === Colors.WHITE ? logo_white : logo_black
    }

    canMove(target: CellChess): boolean {
        if(!super.canMove(target))
          return false;
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2
    
        if ((target.y === this.cell.y + direction || this.isFirstStep
            && (target.y === this.cell.y + firstStepDirection))
            && target.i === this.cell.i
            && this.cell.board.getCell(target.i, target.y).isEmpty()) {
          return true;
        }
    
        if(target.y === this.cell.y + direction
            && (target.i === this.cell.i + 1 || target.i === this.cell.i - 1)
            && this.cell.isEnemy(target)) {
          return true;
        }
    
        return false;
      }
    
      moveFigure(target: CellChess) {
        super.moveFigure(target);
        this.isFirstStep = false;
      }
}
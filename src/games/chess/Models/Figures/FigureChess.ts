
import logo from '../../assets/white-king.png'
import { CellChess } from '../CellChess';
import { Colors } from '../Colors';

export enum FigureNames {
    FIGURE = "figure",
    KING = "king",
    KNIGHT = "knight",
    PAWN = "pawn",
    QUEEN = "queen",
    ROOK = "rook",
    BISHOP = "bishop",
}

export class FigureChess{
    color : Colors;
    cell : CellChess;
    id : number;
    logo : typeof logo | null;
    name : FigureNames;
    was_mooving : boolean;

    constructor (color : Colors, cell : CellChess){
        this.color = color;
        this.cell = cell;
        this.cell.figure = this
        this.id = Math.random();
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.was_mooving = false
    }


    canMove(target: CellChess) : boolean {
        if(target.figure?.color === this.color)
          return false
        // if(target.figure?.name === FigureNames.KING)
        //   return false
        return true;
    }

    setWasMooving(){
      this.was_mooving = true
    }

    moveFigure(target: CellChess) {}
}
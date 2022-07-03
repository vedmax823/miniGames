
import { CellChess } from '../CellChess';
import { Colors } from '../Colors';
import { FigureChess, FigureNames } from './FigureChess';
import logo_white from '../../assets/white-king.png'
import logo_black from '../../assets/black-king.png' 



export class King extends FigureChess{
    constructor(color : Colors,  cell : CellChess){
        super(color, cell);
        this.name = FigureNames.KING;
        this.logo = color === Colors.WHITE ? logo_white : logo_black
    }

    canMove(target: CellChess): boolean {
        if(!super.canMove(target))
          return false;
        if ((!this.was_mooving) && (target.y === 0) && (this.color === Colors.BLACK)){
            if (target.i === 6){
                if (!this.cell.board.getCell(7, 0).figure?.was_mooving){
                    if ((this.cell.board.getCell(6, 0).figure || this.cell.board.getCell(5, 0).figure)
                        || (this.cell.board.getCell(6, 0).checkCellUnderAttack(Colors.BLACK) 
                        || this.cell.board.getCell(5, 0).checkCellUnderAttack(Colors.BLACK))
                        || (this.checkCheck())) return false
                    
                    return true
                } 
                return false
            }
            if (target.i === 2){
                if (!this.cell.board.getCell(0, target.y).figure?.was_mooving){
                    if ((this.cell.board.getCell(3, 0).figure || this.cell.board.getCell(2, 0).figure) 
                        || (this.cell.board.getCell(3, 0).checkCellUnderAttack(Colors.BLACK) 
                        || this.cell.board.getCell(2, 0).checkCellUnderAttack(Colors.BLACK))
                        || (this.checkCheck())) return false
                    return true
                }
                return false
            }
        }

        if ((!this.was_mooving) && (target.y === 7) && (this.color === Colors.WHITE)){
            if (target.i === 6){
                if (this.cell.board.getCell(7, 7).figure && !this.cell.board.getCell(7, target.y).figure?.was_mooving){
                    if ((this.cell.board.getCell(6, 7).figure || this.cell.board.getCell(5, 7).figure) 
                        || (this.cell.board.getCell(6, 7).checkCellUnderAttack(Colors.WHITE) 
                        || this.cell.board.getCell(5, 7).checkCellUnderAttack(Colors.WHITE))
                        || (this.checkCheck())) return false
                    return true
                }
                return false
            }
            if (target.i === 2){
                if (!this.cell.board.getCell(0, target.y).figure?.was_mooving){
                    if ((this.cell.board.getCell(3, 7).figure || this.cell.board.getCell(2, 7).figure) 
                        || (this.cell.board.getCell(3, 7).checkCellUnderAttack(Colors.WHITE) 
                        || this.cell.board.getCell(2, 7).checkCellUnderAttack(Colors.WHITE))
                        ||(this.checkCheck())) return false
                    return true
                } 
                return false
            }

        }
       
        
        let dy = Math.abs(this.cell.y - target.y)
        let dx = Math.abs(this.cell.i - target.i)
        if ((dy > 1) || (dx > 1)) return false
        return true
    }


    checkCheck() : boolean{
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                let target = this.cell.board.getCell(j ,i)
                
                if (target.figure && (target.figure?.color !== this.color)){
                    if (target.figure.canMove(this.cell)) return true
                }
            }
        }
        return false
    }


}
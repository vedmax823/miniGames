import { BoardChess } from './BoardChess';
import { FigureChess, FigureNames } from './Figures/FigureChess';

import { Colors } from './Colors';
import { BinaryOperatorToken } from 'typescript';
export class CellChess{
    readonly i : number;
    readonly y : number;
    readonly color : string;
    readonly id : number;
    figure : FigureChess | null;
    possible: boolean;
    board : BoardChess;

    constructor(i : number, y : number, figure : FigureChess | null, board : BoardChess){
        this.i = i;
        this.y = y;
        this.color = ((i + y) % 2 == 0) ? Colors.WHITE : Colors.BLACK
        this.id = Math.random()
        this.figure = figure
        this.possible = false;
        this.board = board;
    }

    isEmpty(): boolean {
        return this.figure === null;
    }
    
    isEnemy(target: CellChess): boolean {
        if (target.figure) {
          return this.figure?.color !== target.figure.color;
        }
        return false;
    }
    
    isEmptyVertical(target: CellChess): boolean {
        if (this.i !== target.i) {
          return false;
        }
    
        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for (let y = min + 1; y < max; y++) {
          if(!this.board.getCell(this.i, y).isEmpty()) {
            return false
          }
        }
        return true;
    }
    
    isEmptyHorizontal(target: CellChess): boolean {
        if (this.y !== target.y) {
          return false;
        }
    
        const min = Math.min(this.i, target.i);
        const max = Math.max(this.i, target.i);
        for (let x = min + 1; x < max; x++) {
          if(!this.board.getCell(x, this.y).isEmpty()) {
            return false
          }
        }
        return true;
    }
    
    isEmptyDiagonal(target: CellChess): boolean {
        const absX = Math.abs(target.i - this.i);
        const absY = Math.abs(target.y - this.y);
        if(absY !== absX)
          return false;
    
        const dy = this.y < target.y ? 1 : -1
        const dx = this.i < target.i ? 1 : -1
    
        for (let i = 1; i < absY; i++) {
          if(!this.board.getCell(this.i + dx*i, this.y + dy   * i).isEmpty())
            return false;
        }
        return true;
    }

    setFigure(figure: FigureChess) {
      this.figure = figure;
      this.figure.cell = this;
    }
  
    // addLostFigure(figure: FigureChess) {
    //   figure.color === Colors.BLACK
    //     ? this.board.lostBlackFigures.push(figure)
    //     : this.board.lostWhiteFigures.push(figure)
    // }
  
    moveFigure(target: CellChess) : boolean {
      if(this.figure && this.figure?.canMove(target)) {
        this.figure.moveFigure(target)

        if (this.figure.name === FigureNames.KING && (Math.abs(this.i - target.i) === 2)){

        }
        else{

        }

        
        let figure_buf : FigureChess | null = target.figure
        if (target.figure) {
          //console.log(target.figure)
          //this.addLostFigure(target.figure);
        }
        target.setFigure(this.figure);

        this.figure = null;
        if (target.figure && target.figure.color === Colors.WHITE ? target.board.white_king?.checkCheck() : target.board.black_king?.checkCheck()){
          target.figure && this.setFigure(target.figure)  
          figure_buf ?  target.setFigure(figure_buf) : target.figure = null
          return false
        }
        if (target.figure?.name === FigureNames.KING && (Math.abs(this.i - target.i) === 2)){
          if (target.i === 6) {
            this.board.getCell(5, target.y).setFigure(this.board.getCell(7, target.y).figure!)
            this.board.getCell(5, target.y).figure?.setWasMooving()
            this.board.getCell(7, target.y).figure = null
          }
          if (target.i === 2) {
            this.board.getCell(3, target.y).setFigure(this.board.getCell(0, target.y).figure!)
            this.board.getCell(3, target.y).figure?.setWasMooving()
            this.board.getCell(0, target.y).figure = null
          }
        }
        target.figure?.setWasMooving()
        return true
      }
      return false
    }

    checkCellUnderAttack(color: Colors) : boolean{
      for (let i = 0; i < 8; i++){
          for (let j = 0; j < 8; j++){
              let target = this.board.getCell(j ,i)
              
              if (target.figure && (target.figure?.color !== color)){
                  if (target.figure.canMove(this)) return true
              }
          }
      }
      return false
  }

}

import { Rook } from './Figures/Rook';
import { Knight } from './Figures/Knight';
import { Bishop } from './Figures/Bishop';
import { Queen } from './Figures/Queen';
import { King } from './Figures/King';
import { Colors } from './Colors';
import { Pawn } from './Figures/Pawn';
import { CellChess } from './CellChess';
export class BoardChess{
    cells: CellChess[][] = []

    white_king : King | null = null;
    black_king : King | null = null;
    

    public init_cells() {
        for (let i = 0; i < 8; i ++){
            const rows : CellChess[] = []
            for (let j = 0; j < 8; j ++){
                rows.push(new CellChess(j, i, null, this))
            }
            this.cells.push(rows)
        }
    }

    getCell(x: number, y : number){
        return this.cells[y][x]   
    }

    public getCopyBoard(): BoardChess {
        const newBoard = new BoardChess();
        newBoard.cells = this.cells;
        //newBoard.lostWhiteFigures = this.lostWhiteFigures
        //newBoard.lostBlackFigures = this.lostBlackFigures
        return newBoard;
      }

    public findCells(selectedCell: CellChess | null) {
        for (let i = 0; i < this.cells.length; i++) {
          const row = this.cells[i];
          for (let j = 0; j < row.length; j++) {
            const target = row[j];
            target.possible = !!selectedCell?.figure?.canMove(target)
          }
        }
    }


    private addPawns() {
        for (let i = 0; i < 8; i++) {
          new Pawn(Colors.BLACK, this.getCell(i, 1))
          new Pawn(Colors.WHITE, this.getCell(i, 6))
        }
    }
    
    private addKings() {
        this.white_king = new King(Colors.WHITE, this.getCell(4, 7)) 
        this.black_king = new King(Colors.BLACK, this.getCell(4, 0)) 
        
    }
    
    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }
    
    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.BLACK, this.getCell(5, 0))
        new Bishop(Colors.WHITE, this.getCell(2, 7))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
    }
    
    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0))
        new Knight(Colors.BLACK, this.getCell(6, 0))
        new Knight(Colors.WHITE, this.getCell(1, 7))
        new Knight(Colors.WHITE, this.getCell(6, 7))
    }
    
    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0, 0))
        new Rook(Colors.BLACK, this.getCell(7, 0))
        new Rook(Colors.WHITE, this.getCell(0, 7))
        new Rook(Colors.WHITE, this.getCell(7, 7))
    }
    
    
    public addFigures() {
        this.addPawns()
        this.addKnights()
        this.addKings()
        this.addBishops()
        this.addQueens()
        this.addRooks()
    }

}
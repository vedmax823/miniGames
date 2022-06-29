import { Board } from "../../blockGame/models/Board"
import { Cell } from "./Cell"

export class Board2048{
    cells : Cell[][] = []
    
    constructor (){
        for (let i =0; i < 4; i++){
            let row : Cell[] = []
            for (let j = 0; j < 4; j++){
                row.push(new Cell(j, i))
            }
            this.cells.push(row)
        }

        this.getRandomCell()
        this.getRandomCell()
    }

    getRandomCell(){
        let emptyCells = this.getEmptyCells()
        let index = Math.floor(Math.random() * emptyCells.length)
        let cell = emptyCells[index]
        if (cell !== undefined){
            var k = Math.random();
            if (k > 0.9) cell.value = 4
            else cell.value = 2
        }
        
        //console.log(cell)
    }

    getEmptyCells() : Cell[]{
        let emptyCells : Cell[] = []
        this.cells.forEach(row =>
            row.forEach(cell => {
                !cell.value && emptyCells.push(cell)
            })
        )
        return emptyCells
    }

    getCopyBoard(cells : Cell[][]){
        let newBoard = new Board2048()
        newBoard.cells = cells
        return newBoard
    }

    left(){
        let flag = false;
        for (let i = 0; i < this.cells.length; i++){
            flag = this.createLineLeft(this.cells[i])
            console.log(flag)
        }
    }

    right(){
        let flag = false;
        for(let i = 0; i < this.cells.length; i++){
            flag = this.createLineRight(this.cells[i])
        }
    }

    up(){
        let flag = false;
        for(let i =0; i < this.cells.length; i++){
            flag = this.createLineUp(this.cells, i)
        }
    }

    down(){
        let flag = false;
        for(let i =0; i < this.cells.length; i++){
            flag = this.createLineDown(this.cells, i)
        }
    }

    private createLineLeft(cells : Cell[]) : boolean{
        let point_insert : number = 0;
        let was_moving = false;
        for(let j = 0; j < cells.length; j++){
            if (cells[j].value != undefined){
                if (point_insert != j){
                    cells[point_insert].value = cells[j].value
                    cells[j].value = undefined
                    was_moving = true;
                }
                point_insert++; 
            }
        }
        for(let j = 0; j < cells.length -1; j++){
            if (cells[j].value != undefined) {
                if (cells[j].value == cells[j+1].value){
                    cells[j].value = cells[j].value! * 2
                    cells[j+1].value = undefined
                    was_moving = true;
                }
            }
        }
        point_insert = 0;
        for(let j = 0; j < cells.length; j++){
            if (cells[j].value != undefined){
                if (point_insert != j){
                    cells[point_insert].value = cells[j].value
                    cells[j].value = undefined
                    was_moving = true;
                }
                point_insert++; 
            }
        }

        return was_moving;
    }

    private createLineRight(cells: Cell[]) : boolean{
        let point_insert : number = cells.length -1;
        let was_moving = false;
        for(let j = cells.length -1; j >= 0; j--){
            if (cells[j].value != undefined){
                if (point_insert != j){
                    cells[point_insert].value = cells[j].value
                    cells[j].value = undefined
                    was_moving = true;
                }
                point_insert--; 
            }
        }
        for(let j = cells.length -1; j > 0; j--){
            if (cells[j].value != undefined) {
                if (cells[j].value == cells[j-1].value){
                    cells[j].value = cells[j].value! * 2
                    cells[j-1].value = undefined
                    was_moving = true;
                }
            }
        }
        point_insert = cells.length -1;
        for(let j = cells.length -1; j >= 0; j --){
            
            if (cells[j].value != undefined){
                if (point_insert != j){
                    cells[point_insert].value = cells[j].value
                    cells[j].value = undefined
                    was_moving = true;
                }
                point_insert--; 
            }
        }
        return was_moving;
    }

    private createLineUp(cells : Cell[][], i : number) : boolean {
        let point_insert : number = 0;
        let was_moving = false;
        for(let j = 0; j < cells.length; j++){
            if (cells[j][i].value != undefined){
                if (point_insert != j){
                    cells[point_insert][i].value = cells[j][i].value
                    cells[j][i].value = undefined
                    was_moving = true;
                }
                point_insert++; 
            }
        }
        for(let j = 0; j < cells.length -1; j++){
            if (cells[j][i].value != undefined) {
                if (cells[j][i].value == cells[j+1][i].value){
                    cells[j][i].value = cells[j][i].value! * 2
                    cells[j+1][i].value = undefined
                    was_moving = true;
                }
            }
        }
        point_insert = 0;
        for(let j = 0; j < cells.length; j++){
            
            if (cells[j][i].value != undefined){
                if (point_insert != j){
                    cells[point_insert][i].value = cells[j][i].value
                    cells[j][i].value = undefined
                    was_moving = true;
                }
                point_insert++; 
            }
        }
        return was_moving;
    }

    private createLineDown(cells: Cell[][], i : number) : boolean{
        let point_insert : number = cells.length -1;
        let was_moving = false;
        for(let j = cells.length -1; j >= 0; j--){
            if (cells[j][i].value != undefined){
                if (point_insert != j){
                    cells[point_insert][i].value = cells[j][i].value
                    cells[j][i].value = undefined
                    was_moving = true;
                }
                point_insert--; 
            }
        }
        for(let j = cells.length -1; j > 0; j--){
            if (cells[j][i].value != undefined) {
                if (cells[j][i].value == cells[j-1][i].value){
                    cells[j][i].value = cells[j][i].value! * 2
                    cells[j-1][i].value = undefined
                    was_moving = true;
                }
            }
        }
        point_insert = cells.length -1;
        for(let j = cells.length -1; j >= 0; j --){
            
            if (cells[j][i].value != undefined){
                if (point_insert != j){
                    cells[point_insert][i].value = cells[j][i].value
                    cells[j][i].value = undefined
                    was_moving = true;
                }
                point_insert--; 
            }
        }
        return was_moving;
    }


}
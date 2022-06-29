import { Cell } from "./Cell";

export class BigCell extends Cell{
    
    cells : Cell[][] = []

    public pushSmallCells(arr : Cell[][]) {
        this.cells = arr
    }
    
}
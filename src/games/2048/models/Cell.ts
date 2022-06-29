export class Cell{
    x : number;
    y: number;
    value : number | undefined;
    id : number;

    constructor (x: number, y : number){
        this.x = x;
        this.y = y;
        this.value = undefined;
        this.id = Math.random()
    }
}
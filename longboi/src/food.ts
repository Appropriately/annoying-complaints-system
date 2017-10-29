import { Board } from "./board"

export class Food {
    x: number
    y: number

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    draw(board: Board) {
        board.drawSquare(this.x, this.y, "#61AFEF")
    }

    update(board: Board) {
        // Do nothing
    }
}

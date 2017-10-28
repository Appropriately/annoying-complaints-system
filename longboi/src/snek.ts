import { Board } from "./board"

enum Direction { North, East, South, West }

export class Snek {
    segmentDirections: Direction[] = []
    headIndex = 0
    headPosition = { x: 0, y: 0 }
    length = 0

    draw = function (board: Board) {
        // TODO
    }

    update = function (board: Board) {
        // TODO
    }
}

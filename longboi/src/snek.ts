import { Board } from "./board"

enum Direction { North, East, South, West }

export class Snek {
    segmentDirections: Direction[] = []
    headIndex = 0
    headPosition = { x: 0, y: 0 }
    keyPressed: number

    constructor(x: number, y: number, length: number) {
        this.segmentDirections = new Array(length)
        for (let i = 0; i < length; ++i) {
            this.segmentDirections[i] = Direction.West
        }
        this.headIndex = 0
        this.headPosition = {x: x, y: y}

        // Listen to keyboard events
        window.addEventListener("keyup", (e) => {
            this.keyPressed = e.keyCode
        })
    }

    draw(board: Board) {
        let curX = this.headPosition.x
        let curY = this.headPosition.y
        for (let i = 0; i < this.getLength(); ++i) {
            board.drawSquare(curX, curY, "red") // Hardcode it for the demo lmao
            switch (this.segmentDirections[(this.headIndex + i)
                                           % this.getLength()]) {
                case Direction.North:
                    --curY
                    break
                case Direction.East:
                    ++curX
                    break
                case Direction.South:
                    ++curY
                    break
                case Direction.West:
                    --curX
                    break
            }
        }
    }

    update(board: Board) {
        let dir: Direction = this.segmentDirections[this.headIndex]
        this.headIndex = (this.headIndex + 1) % this.getLength()
        switch (this.keyPressed) {
            case 38: // Up arrow
                dir = Direction.South
                break
            case 39: // Right arrow
                dir = Direction.West
                break
            case 40: // Down arrow
                dir = Direction.North
                break
            case 37: // Left arrow
                dir = Direction.East
                break
        }
        this.segmentDirections[this.headIndex] = dir

        switch (dir) {
            case Direction.North:
                ++this.headPosition.y
                break
            case Direction.East:
                --this.headPosition.x
                break
            case Direction.South:
                --this.headPosition.y
                break
            case Direction.West:
                ++this.headPosition.x
                break
        }

        // Clear keyboard input
        this.keyPressed = undefined
    }

    getLength() {
        return this.segmentDirections.length
    }
}

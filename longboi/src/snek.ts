import { Board } from "./board"

enum Direction { North, East, South, West }

export class Snek {
    segmentPositions: {x: number, y: number}[] = []
    headIndex = 0
    headDirection: Direction
    key: number
    isPlaying: boolean = false

    constructor(x: number, y: number, length: number) {
        this.segmentPositions = new Array(length)
        for (let i = 0; i < length; ++i) {
            this.segmentPositions[i] = {x: x - i, y: y}
        }
        this.headIndex = 0
        this.headDirection = Direction.East

        // Listen to keyboard events
        window.addEventListener("keyup", (e) => {
            this.key = e.keyCode
        })
    }

    draw(board: Board) {
        this.segmentPositions.forEach((v) => {
            board.drawSquare(v.x, v.y, "red")
        })
    }

    update(board: Board) {
        if (this.isPlaying) {
            let newHeadIndex = this.headIndex - 1 == -1 ? this.getLength() - 1
                                                        : this.headIndex - 1
            switch (this.key) {
                case 38: // Up arrow
                    if (this.headDirection != Direction.South)
                        this.headDirection = Direction.North
                    break
                case 39: // Right arrow
                    if (this.headDirection != Direction.West)
                        this.headDirection = Direction.East
                    break
                case 40: // Down arrow
                    if (this.headDirection != Direction.North)
                        this.headDirection = Direction.South
                    break
                case 37: // Left arrow
                    if (this.headDirection != Direction.East)
                        this.headDirection = Direction.West
                    break
            }

            switch (this.headDirection) {
                case Direction.North:
                    this.segmentPositions[newHeadIndex].x
                        = this.segmentPositions[this.headIndex].x
                    this.segmentPositions[newHeadIndex].y
                        = this.segmentPositions[this.headIndex].y - 1
                    break
                case Direction.East:
                    this.segmentPositions[newHeadIndex].x
                        = this.segmentPositions[this.headIndex].x + 1
                    this.segmentPositions[newHeadIndex].y
                        = this.segmentPositions[this.headIndex].y
                    break
                case Direction.South:
                    this.segmentPositions[newHeadIndex].x
                        = this.segmentPositions[this.headIndex].x
                    this.segmentPositions[newHeadIndex].y
                        = this.segmentPositions[this.headIndex].y + 1
                    break
                case Direction.West:
                    this.segmentPositions[newHeadIndex].x
                        = this.segmentPositions[this.headIndex].x - 1
                    this.segmentPositions[newHeadIndex].y
                        = this.segmentPositions[this.headIndex].y
                    break
            }
            this.headIndex = newHeadIndex
        } else {
            board.drawOverlayText("Press any key to play  L O N G B O I")
            this.isPlaying = this.key != undefined
        }

        // Clear keyboard input
        this.key = undefined
    }

    getLength() {
        return this.segmentPositions.length
    }
}

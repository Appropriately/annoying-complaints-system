import { Board } from "./board"

enum Direction { North, East, South, West }

export class Snek {
    positions: {x: number, y: number}[] = []
    headIndex = 0
    headDirection: Direction
    key: number
    isPlaying: boolean = false
    died: boolean = false
    initialLength = 0
    initialX = 0
    initialY = 0

    constructor(x: number, y: number, length: number) {
        this.initialLength = length
        this.initialX = x
        this.initialY = y
        this.reset()

        // Listen to keyboard events
        window.addEventListener("keyup", (e) => {
            this.key = e.keyCode
        })
    }

    reset() {
        this.died = false
        this.positions = new Array(this.initialLength)
        for (let i = 0; i < this.initialLength; ++i) {
            this.positions[i] = {x: this.initialX - i, y: this.initialY}
        }
        this.headIndex = 0
        this.headDirection = Direction.East
    }

    draw(board: Board) {
        this.positions.forEach((v) => {
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
                    this.positions[newHeadIndex].x
                        = this.positions[this.headIndex].x
                    this.positions[newHeadIndex].y
                        = this.positions[this.headIndex].y - 1
                    break
                case Direction.East:
                    this.positions[newHeadIndex].x
                        = this.positions[this.headIndex].x + 1
                    this.positions[newHeadIndex].y
                        = this.positions[this.headIndex].y
                    break
                case Direction.South:
                    this.positions[newHeadIndex].x
                        = this.positions[this.headIndex].x
                    this.positions[newHeadIndex].y
                        = this.positions[this.headIndex].y + 1
                    break
                case Direction.West:
                    this.positions[newHeadIndex].x
                        = this.positions[this.headIndex].x - 1
                    this.positions[newHeadIndex].y
                        = this.positions[this.headIndex].y
                    break
            }
            this.headIndex = newHeadIndex
        } else {
            if (this.died) {
                board.drawOverlayText("You died; "
                                      + "Press any key to play  L O N G B O I")
            } else {
                board.drawOverlayText("Press any key to play  L O N G B O I")
            }
            if (this.key != undefined) {
                this.reset()
                this.isPlaying = true
            }
        }

        // Check for death
        const offGrid = this.positions[this.headIndex].x > board.getWidth()-1
                        || this.positions[this.headIndex].x < 0
                        || this.positions[this.headIndex].y > board.getWidth()-1
                        || this.positions[this.headIndex].y < 0
        const eatSelf = this.positions.filter((v) => {
            let pos = this.positions[this.headIndex]
            return v.x == pos.x && v.y == pos.y
        }).length > 1
        if (offGrid || eatSelf) {
            this.isPlaying = false
            this.died = true
        }

        // Clear keyboard input
        this.key = undefined
    }

    getLength() {
        return this.positions.length
    }
}

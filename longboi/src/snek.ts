import { Board } from "./board"

enum Direction { North, East, South, West }

export class Snek {
    positions: { x: number, y: number }[] = []
    headIndex = 0
    headDirection: Direction
    key: number
    isPlaying: boolean = false
    died: boolean = false
    won: boolean = false
    noms: number = 0
    initialLength = 0
    initialX = 0
    initialY = 0

    constructor(board: Board, x: number, y: number, length: number) {
        this.initialLength = length
        this.initialX = x
        this.initialY = y
        this.reset(board)

        // Listen to keyboard events
        window.addEventListener("keyup", (e) => {
            this.key = e.keyCode
        })
    }

    reset(board: Board) {
        board.clear()
        this.died = false
        this.won = false
        this.noms = 0
        this.positions = new Array(this.initialLength)
        for (let i = 0; i < this.initialLength; ++i) {
            let x = this.initialX - i
            let y = this.initialY
            this.positions[i] = { x: x, y: y }
            board.grid[x][y] = true
        }
        this.headIndex = 0
        this.headDirection = Direction.East
    }

    draw(board: Board) {
        this.positions.forEach((v) => {
            board.drawSquare(v.x, v.y, "#E06C75")
        })

        if (!this.isPlaying) {
            if (this.died) {
                board.drawOverlayText("You died; "
                    + "Press any key to play  L O N G B O I")
            } else if (this.won) {
                board.drawOverlayText("You won! Press any key to play again")
            } else {
                board.drawOverlayText("Press any key to play  L O N G B O I")
            }
        }
    }

    update(board: Board) {
        if (this.isPlaying) {
            let newHeadIndex = this.headIndex - 1 == -1 ? this.getLength() - 1
                : this.headIndex - 1

            // Remove tail from record of occupied squares
            board.grid[this.positions[newHeadIndex].x]
                      [this.positions[newHeadIndex].y] = false

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

            // Check for death
            const offGrid
                = this.positions[this.headIndex].x > board.getWidth() - 1
                || this.positions[this.headIndex].x < 0
                || this.positions[this.headIndex].y > board.getWidth() - 1
                || this.positions[this.headIndex].y < 0
            const eatSelf = this.positions.filter((v, i, l) => {
                let pos = this.positions[this.headIndex]
                return v.x == pos.x && v.y == pos.y
            }).length > 1
            if (offGrid || eatSelf) {
                this.isPlaying = false
                this.died = true
                return
            }

            // Add head to record of occupied squares
            board.grid[this.positions[this.headIndex].x]
                      [this.positions[this.headIndex].y] = true

            // Check for food
            let foodFound = board.foodAt(this.positions[this.headIndex].x,
                this.positions[this.headIndex].y)
            if (foodFound) {
                // Extend snake
                let tailIndex = newHeadIndex > 0 ? newHeadIndex - 1
                                                 : this.getLength() - 1
                this.positions.splice(tailIndex, 0, {
                    x: this.positions[tailIndex].x,
                    y: this.positions[tailIndex].y
                })
                ++this.headIndex

                ++this.noms

                // Test if the player has won
                if (this.noms >= 5) {
                    this.won = true
                    this.isPlaying = false
                }

                board.placeFood()
            }
        } else if (this.key != undefined) {
            this.reset(board)
            board.placeFood()
            this.isPlaying = true
        }

        // Clear keyboard input
        this.key = undefined
    }

    getLength() {
        return this.positions.length
    }
}

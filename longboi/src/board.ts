import { Entity } from "./entity"
import { Food } from "./food"

export class Board {
    stageColor = "#282C34"

    grid: boolean[][] // Is square occupied?
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
    leftRightMargin = 0
    topBottomMargin = 0
    tileSize = 0
    food: Food = undefined

    constructor(width: number, height: number,
                ctx: CanvasRenderingContext2D,
                canvas: HTMLCanvasElement) {
        this.ctx = ctx
        this.canvas = canvas

        this.grid = new Array(width)
        for (let i = 0; i < width; ++i) {
            this.grid[i] = new Array(height)
        }
        this.clear()

        this.tileSize = Math.min(Math.floor(this.canvas.width / width),
                                 Math.floor(this.canvas.height / height))

        this.leftRightMargin = (this.canvas.width - this.tileSize
                                                    * this.getWidth())
                               / 2
        
        this.topBottomMargin = (this.canvas.height - this.tileSize
                                                     * this.getHeight())
                               / 2
    }

    draw() {
        // Draw stage
        this.ctx.fillStyle = this.stageColor
        this.ctx.fillRect(this.leftRightMargin, this.topBottomMargin,
                          this.tileSize * this.getWidth(),
                          this.tileSize * this.getHeight())

        if (this.food != undefined) {
            this.food.draw(this)
        }
    }

    clear() {
        for (let i = 0; i < this.getWidth(); ++i) {
            for (let j = 0; j < this.getHeight(); ++j) {
                this.grid[i][j] = false
            }
        }
        this.food = undefined
    }

    placeFood() {
        if (this.food == undefined) {
            this.food = new Food()
        }
        this.grid[this.food.x][this.food.y] = false
        do {
            this.food.x = Math.floor(Math.random() * (this.getWidth() - 1))
            this.food.y = Math.floor(Math.random() * (this.getHeight() - 1))
        } while (this.grid[this.food.x][this.food.y] == true)
        this.grid[this.food.x][this.food.y] = true
    }

    foodAt(x: number, y: number): boolean {
        return x == this.food.x && y == this.food.y
    }

    getWidth() {
        return this.grid.length
    }

    getHeight() {
        return this.grid[0].length
    }

    drawSquare(x: number, y: number, fill: string) {
        this.ctx.fillStyle = fill
        this.ctx.fillRect((this.leftRightMargin + x) * this.tileSize,
                          (this.topBottomMargin + y) * this.tileSize,
                          this.tileSize, this.tileSize)
    }

    drawOverlayText(text: string) {
        this.ctx.fillStyle = "white"
        this.ctx.font = "18px Arial"
        this.ctx.textAlign = "center"
        this.ctx.fillText(text, this.canvas.height / 2, this.canvas.width / 2)
    }
}

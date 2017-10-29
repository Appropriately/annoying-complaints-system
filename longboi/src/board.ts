import { Entity } from "./entity"

export class Board {
    stageColor = "Black"

    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
    width: number
    height: number
    leftRightMargin = 0
    topBottomMargin = 0
    tileSize = 0

    constructor(width: number, height: number,
                ctx: CanvasRenderingContext2D,
                canvas: HTMLCanvasElement) {
        this.ctx = ctx
        this.canvas = canvas

        this.width = width
        this.height = height

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
    }

    getWidth() {
        return this.width
    }

    getHeight() {
        return this.height
    }

    drawSquare(x: number, y: number, fill: string) {
        this.ctx.fillStyle = fill
        this.ctx.fillRect((this.leftRightMargin + x) * this.tileSize,
                          (this.topBottomMargin + y) * this.tileSize,
                          this.tileSize, this.tileSize)
    }

    drawOverlayText(text: string) {
        this.ctx.fillStyle = "white"
        this.ctx.fillText(text, this.leftRightMargin,
                          this.canvas.height / 2 - this.topBottomMargin,
                          this.canvas.width - 2 * this.leftRightMargin)
    }
}

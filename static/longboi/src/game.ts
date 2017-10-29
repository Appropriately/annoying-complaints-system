import { Snek } from "./snek"
import { Entity } from "./entity"
import { Board } from "./board"

export namespace game {
    // Magic constants
    const updateDelay = 150
    const gridHeight = 10
    const gridWidth = 10

    let canvas: HTMLCanvasElement
    let context: CanvasRenderingContext2D

    let entities: Entity[] = []
    let board: Board

    export function run() {
        canvas = <HTMLCanvasElement> document.getElementById("longboi-canvas")
        context = canvas.getContext("2d")
        start()
        setInterval(() => { draw(); update() }, updateDelay)
    }

    function start() {
        // TODO: create level and snek
        // snek = new Snek()
        board = new Board(gridWidth, gridHeight, context, canvas)
        entities.push(new Snek(board, 3, 0, 4))
    }

    function draw() {
        // Clear screen
        context.clearRect(0, 0, canvas.width, canvas.height)

        board.draw()

        // Draw entities
        entities.forEach((e, n, l) => {
            entities[n].draw(board)
        })
    }

    function update() {
        entities.forEach((e, n, l) => {
            entities[n].update(board)
        })
    }
}

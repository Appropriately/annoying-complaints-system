import { Snek } from "./snek"
import { Entity } from "./entity"
import { Board } from "./board"

export namespace game {
    // Magic constants
    const updateFrequency = 100
    const gridHeight = 20
    const gridWidth = 20

    const canvas = <HTMLCanvasElement> document.getElementById("longboi-canvas")
    const context = canvas.getContext("2d")

    let entities: Entity[] = []
    let board: Board

    export function run() {
        start()
        setInterval(() => { draw(); update() }, updateFrequency)
    }

    function start() {
        // TODO: create level and snek
        // snek = new Snek()
        board = new Board(gridWidth, gridHeight, context, canvas)

        entities.push(new Snek(3, 0, 4))
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

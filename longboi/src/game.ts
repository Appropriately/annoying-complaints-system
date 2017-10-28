export namespace game {
    const canvas = <HTMLCanvasElement> document.getElementById("longboi-canvas")
    const context = canvas.getContext("2d")

    export function run() {
        let isRunning = true;
        start()
        while (isRunning) {
            draw()
            update()
        }
    }

    function start() {
        // TODO: create snek
    }

    function draw() {
        // TODO: draw level, then the food, then snek
    }

    function update() {
        // TODO: move snek, deal with food behaviour
    }
}

import { game } from "./game"

// Wait until there is a canvas
let id = window.setInterval(() => {
    if (document.getElementById("longboi-canvas") != null) {
        window.clearInterval(id)

        // Start the Longboi game
        game.run()
    }
}, 300)

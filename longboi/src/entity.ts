import { Board } from "./board"

export interface Entity {
    draw: (board: Board) => void
    update: (board: Board) => void
}

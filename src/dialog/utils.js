import { DIALOG_WINDOW_HEIGHT, DIALOG_WINDOW_WIDTH, TILE_WIDTH } from "../constants";

export const createDialogWindow = () => {
    return add(rect(DIALOG_WINDOW_WIDTH, DIALOG_WINDOW_HEIGHT), pos(window.innerWidth - TILE_WIDTH, window.innerHeight - TILE_WIDTH));
};

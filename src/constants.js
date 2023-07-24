export const MUKTAR_SPEED = 100.0;
export const TILE_WIDTH = 30;
export const DIALOG_WINDOW_WIDTH = window.innerWidth;  // TODO: Replace with canvas
export const DIALOG_WINDOW_HEIGHT = TILE_WIDTH * 12;
export const DIALOG_WINDOW_POSITION_X = 0;
export const DIALOG_WINDOW_POSITION_Y = window.innerHeight - DIALOG_WINDOW_HEIGHT;
export const DIALOG_WINDOW_MARGIN = 24;
export const DIALOG_WINDOW_RIGHT_EDGE = DIALOG_WINDOW_WIDTH - (DIALOG_WINDOW_MARGIN * 2);
export const DIALOG_WINDOW_BOTTOM_EDGE = DIALOG_WINDOW_HEIGHT - (DIALOG_WINDOW_MARGIN * 2);
export const DIALOG_WINDOW_OUTLINE_WIDTH = 16;
export const INTERACTION_TYPES = {
    TALK: "talk",
};
export const COLORS = {
    DIALOG_WINDOW: [12.5, 50, 100],
    DIALOG_WINDOW_OUTLINE: [25, 100, 200],
};

export const STATE = {
    default: "DEFAULT",
};

export const NAMES = ["Ludwig", "Clementine", "Gorm", "Cordelia"];

export const DIALOG_COMPLETE_FLAG = "<<COMPLETE>>";

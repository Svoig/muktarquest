import { COLORS, DIALOG_WINDOW_HEIGHT, DIALOG_WINDOW_POSITION_X, DIALOG_WINDOW_POSITION_Y, DIALOG_WINDOW_WIDTH, DIALOG_WINDOW_MARGIN, DIALOG_WINDOW_OUTLINE_WIDTH } from "../constants";

export const createDialogWindow = (displayText) => {
    const dialogWindow = add([
        rect(DIALOG_WINDOW_WIDTH, DIALOG_WINDOW_HEIGHT),
        pos(DIALOG_WINDOW_POSITION_X, DIALOG_WINDOW_POSITION_Y),
        color(COLORS.DIALOG_WINDOW),
        outline(DIALOG_WINDOW_OUTLINE_WIDTH, COLORS.DIALOG_WINDOW_OUTLINE), 
        { currentText: "" },
    ]);

    const newText = dialogWindow.add([
        text("Yo, what up?", { fontSize: 48, size: DIALOG_WINDOW_HEIGHT - 2 * DIALOG_WINDOW_MARGIN, width: DIALOG_WINDOW_WIDTH - 2 * DIALOG_WINDOW_MARGIN }),
        pos(dialogWindow.pos.x - DIALOG_WINDOW_MARGIN, dialogWindow.pos.y + DIALOG_WINDOW_MARGIN),
        color(255, 0, 0),
        z(5),
    ]);

    // Store the text game object on the window so we can access it later
    dialogWindow.currentText = newText;

    return dialogWindow;
};

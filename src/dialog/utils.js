import {
  COLORS,
  DIALOG_WINDOW_HEIGHT,
  DIALOG_WINDOW_POSITION_X,
  DIALOG_WINDOW_POSITION_Y,
  DIALOG_WINDOW_WIDTH,
  DIALOG_WINDOW_MARGIN,
  DIALOG_WINDOW_OUTLINE_WIDTH,
  TILE_WIDTH,
  DIALOG_WINDOW_RIGHT_EDGE,
  DIALOG_WINDOW_BOTTOM_EDGE,
  DIALOG_COMPLETE_FLAG,
} from "../constants";

export const DIALOG_WINDOW = {
  gameObject: null,
  dialog: null,
  currentLine: 0, // Track which line in the current dialogue we're on

  createDialogWindow: function (displayText) {
    const dialogWindow = add([
      rect(DIALOG_WINDOW_WIDTH, DIALOG_WINDOW_HEIGHT),
      pos(DIALOG_WINDOW_POSITION_X, DIALOG_WINDOW_POSITION_Y),
      color(COLORS.DIALOG_WINDOW),
      outline(DIALOG_WINDOW_OUTLINE_WIDTH, COLORS.DIALOG_WINDOW_OUTLINE),
      { currentTextObj: null },
    ]);

    const newText = dialogWindow.add([
      text(displayText, {
        size: 48,
        height: DIALOG_WINDOW_HEIGHT - 2 * DIALOG_WINDOW_MARGIN,
        width: DIALOG_WINDOW_WIDTH - 2 * DIALOG_WINDOW_MARGIN,
      }),
      pos(DIALOG_WINDOW_MARGIN, DIALOG_WINDOW_MARGIN),
    ]);

    const continueArrow = dialogWindow.add([
      rect(TILE_WIDTH, TILE_WIDTH),
      pos(DIALOG_WINDOW_RIGHT_EDGE, DIALOG_WINDOW_BOTTOM_EDGE),
      color(255, 255, 255),
    ]);

    const arrowBlink = loop(1, () => {
      continueArrow.hidden = !continueArrow.hidden;
    });

    continueArrow.onDestroy(() => {
      arrowBlink.cancel();
    });

    // Store the text game object on the window so we can access it later
    dialogWindow.currentTextObj = newText;

    this.gameObject = dialogWindow;
  },

  updateDialogWindow(newText) {
    const nextLine = this.formatDialogLine(newText);
    this.gameObject.currentTextObj.text = nextLine;
  },

  endDialog() {
    this.destroyDialogWindow();
    this.dialog = null;
    this.currentLine = 0;
  },

  destroyDialogWindow: function () {
    if (this.gameObject) {
      const obj = this.gameObject;
      this.gameObject = null;
      destroy(obj);
    }
  },

  formatDialogLine(line) {
    const speaker = line.name;
    const text = line.text;

    return `${speaker.toUpperCase()}: ${text}`;
  },

  startConversation: function (newDialogObj) {
    this.dialog = newDialogObj;
    const firstLine = newDialogObj.lines[0];
    const formattedFirstLine = this.formatDialogLine(firstLine);
    this.createDialogWindow(formattedFirstLine);
  },

  continue: function () {
    console.log(`CONTINUE! Current line is ${this.currentLine}`);
    const dialogLines = this.dialog ? this.dialog.lines || [] : [];

    if (dialogLines[this.currentLine + 1]) {
      this.currentLine++;
      console.log(`Bumped current line to ${this.currentLine}`);
      this.updateDialogWindow(dialogLines[this.currentLine]);
      console.log(`Should have updated dialog window to ${dialogLines[this.currentLine]}`);
      return dialogLines[this.currentLine];
    } else {
      // If there are no more lines, destroy the window and send back a string telling Muktar the conversation is over
      console.log(`RETURNING ${DIALOG_COMPLETE_FLAG}`);

      this.endDialog();

      return DIALOG_COMPLETE_FLAG;
    }
  },
};

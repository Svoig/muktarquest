import { DIALOG_WINDOW } from "./dialog/utils";
import { STATE, DIALOG_COMPLETE_FLAG } from "./constants";

export default function configMuktarControls(muktar, options) {
  onKeyDown("w", () => {
    if (muktar.state === STATE.default) {
      muktar.move(0, -muktar.speedY);
    }
  });
  onKeyDown("a", () => {
    if (muktar.state === STATE.default) {
      muktar.move(-muktar.speedX, 0);
    }
  });
  onKeyDown("s", () => {
    if (muktar.state === STATE.default) {
      muktar.move(0, muktar.speedY);
    }
  });
  onKeyDown("d", () => {
    if (muktar.state === STATE.default) {
      muktar.move(muktar.speedX, 0);
    }
  });

  onKeyPress("enter", () => {
    handleInteract(muktar);
  });

  muktar.setState = (newState) => {
    muktar.state = newState;
  };

  muktar.onCollide("interactable", (interactable) => {
    muktar.adjacentInteractables.push(interactable);
  });

  muktar.onCollideEnd("interactable", (interactable) => {
    const interactableIndex =
      muktar.adjacentInteractables.indexOf(interactable);

    if (interactableIndex > -1) {
        muktar.adjacentInteractables.splice(interactableIndex, 1);
    }
  });
}

export function handleInteract(muktar) {
  if (muktar.adjacentInteractables.length > 0) {
    const interactable = muktar.adjacentInteractables[0];

    if (interactable.behavior.interactionType === "talk") {
      muktar.setState(STATE.inConversation);

      if (DIALOG_WINDOW.dialog === null) {
        DIALOG_WINDOW.startConversation(interactable.dialog);
      } else {
        const result = DIALOG_WINDOW.continue();
        if (result === DIALOG_COMPLETE_FLAG) {
          muktar.setState(STATE.default);
        }
      }
    }
  }
}

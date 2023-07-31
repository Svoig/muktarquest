import { DIALOG_WINDOW } from "../dialog/utils";
import { SCENES, STATE, DIALOG_COMPLETE_FLAG, ENEMIES, CHARACTERS } from "../constants";

export const MUKTAR = {
    gameObject: null,
};

export const setGlobalMuktar = (newMuktar) => {
    MUKTAR.gameObject = newMuktar;
};

export function configMuktar(muktar, options) {
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

  muktar.onCollide("monster", () => {
    console.log("MONSTER");
  });

  muktar.onCollide("interactable", (interactable) => {

    console.log("HIT INTERACTABLE");
    muktar.adjacentInteractables.push(interactable);

    if (interactable.behavior.onCollide) {
        handleInteract(muktar);
    }
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

    if (interactable.behavior.onCollide) {
        go(SCENES.BATTLE, { party: [CHARACTERS.PARTY.MUKTAR], enemyParty: [interactable.monsterType]})
    }

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

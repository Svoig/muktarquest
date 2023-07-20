import { createDialogWindow } from "./dialog/utils";

export default function configMuktarControls(muktar, options) {
    onKeyDown("w", () => {
        muktar.move(0, -muktar.speedY);
    });
    onKeyDown("a", () => {
        muktar.move(-muktar.speedX, 0);
    });
    onKeyDown("s", () => {
        muktar.move(0, muktar.speedY);
    });
    onKeyDown("d", () => {
        muktar.move(muktar.speedX, 0);
    });

    onKeyDown("enter", () => {
        if (muktar.adjacentInteractables.length > 0) {
            const interactable = muktar.adjacentInteractables[0];

            if (interactable.interaction === "talk") {
                createDialogWindow();
            }
        }
    })

    muktar.onCollide("interactable", (interactable) => {
        muktar.adjacentInteractables.push(interactable);
    });

    muktar.onCollideEnd("interactable", (interactable) => {
        const interactableIndex = muktar.adjacentInteractables.indexOf(interactable);

        if (interactableIndex > -1) {
            muktar.adjacentInteractables.slice(interactableIndex, 1);
        }
    });
}
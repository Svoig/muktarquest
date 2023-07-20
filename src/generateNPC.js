import { INTERACTION_TYPES, TILE_WIDTH } from './constants';
import { randomColor, randomDelay } from './utils';

const npcDefaultOptions = {
    moveOnDelay: true,
};

export default function generateNPC(position, behaviorOptions) {
    const { moveOnDelay } = behaviorOptions || true;
    const col = randomColor();

    return [
        rect(TILE_WIDTH, TILE_WIDTH),
        color(col),
        pos(position),
        area(),
        body({ isStatic: true}),
        "interactable",
        "npc",
        {
            baseColor: col,
            movementDelay: randomDelay(),
            behavior: {
                moveOnDelay,
                interactionType: INTERACTION_TYPES.TALK,
            },
            dialog: {
                greeting: "Hello Muktar! Seen any cool reptiles in the field lately?"
            }
        },
    ];
}

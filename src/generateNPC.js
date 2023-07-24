import { INTERACTION_TYPES, TILE_WIDTH, NAMES } from "./constants";
import { randomColor, randomDelay, randomFromRange } from "./utils";

const npcDefaultOptions = {
  moveOnDelay: true,
};

export default function generateNPC(position, behaviorOptions) {
  const { moveOnDelay } = behaviorOptions || true;
  const col = randomColor();

  const randomIndex = randomFromRange(0, NAMES.length);
  const randomName = NAMES[randomIndex];

  const dialogLines = [
    {
      name: randomName,
      text: "Hello Muktar! Seen any cool reptiles in the field lately?",
    },
    {
      name: "Muktar",
      text: "No, this rotten town has no interesting reptiles . . .",
    },
    {
      name: randomName,
      text: "Aw, cheer up Muktar! I'm sure you'll find a cool reptile next time!",
    },
    {
      name: "Muktar",
      text: ". . .",
    },
  ];

  return [
    rect(TILE_WIDTH, TILE_WIDTH),
    color(col),
    pos(position),
    area(),
    body({ isStatic: true }),
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
        currentLine: 0,
        lines: dialogLines,
      },
    },
  ];
}

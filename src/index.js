import kaboom from "kaboom";

import { MUKTAR_SPEED, TILE_WIDTH } from './constants';
import generateNPC from './generateNPC';
import configMuktar from './configMuktar';
import { randomFromRange } from "./utils";
import { createDialogWindow } from "./dialog/utils";


kaboom();

// Initial tile config
const TILES = {
    ground: () => [
        rect(TILE_WIDTH, TILE_WIDTH),
        color(65, 255, 65),
        z(0), // Make the ground below everything!
        "ground",
    ],
    water: () => [
        rect(TILE_WIDTH, TILE_WIDTH),
        color(65, 0, 225),
        z(0),
        "water",
    ],
    wall: () => [rect(TILE_WIDTH, TILE_WIDTH), color(0, 0, 0), z(1), area(), body({ isStatic: true }), "wall"],
};

// Tiles dependent on other tiles
TILES.muktarStart = () => [...TILES.ground(), "muktarStart"]; // Make sure to add ground tile to these gameObject generators!
TILES.newNPC = () => [...TILES.ground(), "newNPC"];
TILES.muktar = () => [...TILES.ground(), color(255, 0, 0), z(1), area(), body({ isStatic: false }), { speedX: MUKTAR_SPEED, speedY: MUKTAR_SPEED }];

addLevel([
    "                           ",
    "                    N      ",
    "          M   N       =    ",
    " ~~~~~~  ====         =    ",
    " ~~~~~                =    ",
    " ~~~           =      =    ",
    "                           ",
    "===========================",
], {
    // define the size of tile block
    tileWidth: TILE_WIDTH,
    tileHeight: TILE_WIDTH,
    // define what each symbol means, by a function returning a component list (what will be passed to add())
    tiles: {
        " ": TILES.ground,
        "~": TILES.water,
        "=": TILES.wall,
        "M": TILES.muktarStart,
        "N": TILES.newNPC,
    }
});

onLoad(() => {
    const muktarStart = get("muktarStart", { recursive: true })[0];
    const muktar = add([...TILES.muktar(), pos(muktarStart.pos.x, muktarStart.pos.y), {
        adjacentInteractables: [],
    }]);
    configMuktar(muktar);

    const npcsToGenerate = get("newNPC", { recursive: true });

    npcsToGenerate.forEach((newNPC, index) => {
        const generatedNPC = generateNPC(newNPC.pos, { idTag: `generatedNPC${index}`});

        // Add NPC behavior
        onUpdate(generatedNPC.idTag, (npcToUpdate) => {
            wait(npcToUpdate.movementDelay);
            const movement = [randomFromRange(0, 1), randomFromRange(0, 1)];
            npcToUpdate.move(movement)
        });

        add(generatedNPC);
    });
});


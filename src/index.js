import kaboom from "kaboom";

import { MUKTAR_SPEED, TILE_WIDTH, STATE, TILES, ENEMIES } from './constants';
import generateNPC from './generateNPC';
import configMuktar from './configMuktar';
import { randomFromRange } from "./utils";
import { onLevelLoad } from "./level";
import initBattleScene from "./scenes/battle";

kaboom();

loadSprite("dorknerd", "Dorknerd.png");
loadSprite("slime", "Slime.png");

// Tiles dependent on other tiles
TILES.muktarStart = () => [...TILES.ground(), "muktarStart"]; // Make sure to add ground tile to these gameObject generators!
TILES.newNPC = () => [...TILES.ground(), "newNPC"];
TILES.muktar = () => [sprite("dorknerd"), z(1), area(), body({ isStatic: false }), { speedX: MUKTAR_SPEED, speedY: MUKTAR_SPEED, adjacentInteractables: [], state: STATE.default }, "muktar"];
TILES.slime = () => [...TILES.ground(), "monster", { monsterType: ENEMIES.SLIME }];

initBattleScene();

addLevel([
    "                           ",
    "   S                N      ",
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
        "S": TILES.slime,
    }
});



onLoad(onLevelLoad);


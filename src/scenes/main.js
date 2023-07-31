import { TILES, TILE_WIDTH } from "../constants";
import { onLevelLoad } from "../level";

export default function initMainScene() {
  scene("main", () => {
    addLevel(
      [
        "                           ",
        "   S                N      ",
        "          M   N       =    ",
        " ~~~~~~  ====         =    ",
        " ~~~~~                =    ",
        " ~~~           =      =    ",
        "                           ",
        "===========================",
      ],
      {
        // define the size of tile block
        tileWidth: TILE_WIDTH,
        tileHeight: TILE_WIDTH,
        // define what each symbol means, by a function returning a component list (what will be passed to add())
        tiles: {
          " ": TILES.ground,
          "~": TILES.water,
          "=": TILES.wall,
          M: TILES.muktarStart,
          N: TILES.newNPC,
          S: TILES.slime,
        },
      }
    );
  });

  onLoad(onLevelLoad);
}

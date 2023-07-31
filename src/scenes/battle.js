import {
  SCENES,
  CHARACTERS,
  ENEMIES,
  BATTLE_TILES,
  TILE_WIDTH,
} from "../constants";

const defaultBattleProps = {
  party: [],
  enemyParty: [],
};

export const addFromPartyArray = (party) => (partyMember, index) => {
  party.push(
    add([
      ...BATTLE_TILES[partyMember](),
      pos(
        TILE_WIDTH * 5 + TILE_WIDTH * index,
        TILE_WIDTH * 5 + TILE_WIDTH * index
      ),
    ])
  );
};

export default function initBattleScene() {
  scene(SCENES.BATTLE, ({ party, enemyParty } = defaultBattleProps) => {
    const field = add([
      rect(TILE_WIDTH * 160, TILE_WIDTH * 160),
      pos(0, 0),
      color(10, 150, 15),
    ]);

    console.log("ENEMY PARTY IS " + JSON.stringify(enemyParty));

    const playerPartyGameObjects = [];
    const enemyPartyGameObjects = [];

    party.forEach(addFromPartyArray(playerPartyGameObjects));
    enemyParty.forEach(addFromPartyArray(enemyPartyGameObjects));

  });
}

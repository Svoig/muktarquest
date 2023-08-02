import kaboom from "kaboom";

const TILE_WIDTH = 30;

const GLOBAL = {
  player: null,
  flyTarget: null,
};

kaboom({ background: [100, 150, 255] });

addLevel(
  [
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "          P           =                               E                                                     ",
    " ~~~~~~  ====         =                                                                                     ",
    " ~~~~~                =                                                                                     ",
    " ~~~           =      =                                                                                     ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "                                                                                                            ",
    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
  ],
  {
    // define the size of tile block
    tileWidth: TILE_WIDTH,
    tileHeight: TILE_WIDTH,
    // define what each symbol means, by a function returning a component list (what will be passed to add())
    tiles: {
      "~": () => [
        rect(TILE_WIDTH, TILE_WIDTH),
        area(),
        body({ isStatic: true }),
        color(230, 230, 255),
        "cloud",
      ],
      "^": () => [
        rect(TILE_WIDTH, TILE_WIDTH),
        area(),
        body({ isStatic: true }),
        color(50, 100, 255),
        "water",
      ],
      "=": () => [
        rect(TILE_WIDTH, TILE_WIDTH),
        area(),
        body({ isStatic: true }),
        color(200, 50, 50),
        "wall",
      ],
      P: () => ["playerStart"],
      E: () => ["enemyShipStart"],
    },
  }
);

const globalSetup = () => {
  const playerStarts = get("playerStart", { recursive: true });
  const playerStart = playerStarts[0];

  const enemyShipStarts = get("enemyShipStart", { recursive: true });

  enemyShipStarts.forEach((enemyShipStart) => {
    const ship = add([rect(TILE_WIDTH * 2, TILE_WIDTH * 2), pos(enemyShipStart.pos.x, enemyShipStart.pos.y), color(150, 100, 50), { health: 10 }, "enemy", "enemyShip"]);

    ship.hit = (damage) => {
        ship.health -= damage;
        if (ship.health <= 0) {
            destroy(ship);
        }
    };
  });

  GLOBAL.player = add([
    rect(TILE_WIDTH, TILE_WIDTH),
    pos(playerStart.pos.x, playerStart.pos.y),
    color(100, 240, 75),
    { desiredPos: vec2(playerStart.pos.x, playerStart.pos.y) },
    "player",
  ]);

  GLOBAL.flyTarget = add([
    rect(TILE_WIDTH / 2, TILE_WIDTH / 2),
    pos(0, 0),
    "flyTarget",
  ]);
};

globalSetup();

GLOBAL.player.onUpdate(() => {
  if (GLOBAL.player !== null && GLOBAL.player.desiredPos !== null) {
    GLOBAL.player.pos = lerp(
      GLOBAL.player.pos,
      GLOBAL.player.desiredPos,
      0.0125
    );

    GLOBAL.flyTarget.pos = vec2(
      GLOBAL.player.desiredPos.x,
      GLOBAL.player.desiredPos.y
    );
    drawLine({
      p1: GLOBAL.player.pos,
      p2: GLOBAL.flyTarget.pos,
      width: 1,
      color: color(255, 255, 255),
    });
  }
});

onMouseMove((mousePos) => {
  GLOBAL.player.desiredPos = vec2(mousePos.x, mousePos.y);
});

onClick(() => {
    const direction = GLOBAL.flyTarget.pos - GLOBAL.player.pos;

  const bullet = add([
    rect(TILE_WIDTH / 4, TILE_WIDTH / 4),
    pos(GLOBAL.player.pos.x, GLOBAL.player.pos.y),
    color(255, 255, 0),
    { speed: 10, strength: 1, direction: vec2(1, 0) },
    "bullet",
    "playerBullet",
  ]);

  bullet.onUpdate(() => {
    bullet.move(vec2(bullet.direction), bullet.speed);
  });

  onCollide("bullet", "enemy", (bullet, enemy) => {
    enemy.hit(bullet.strength);
    destroy(bullet);
  });
});

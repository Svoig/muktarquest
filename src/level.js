import { setGlobalMuktar, configMuktar } from "./globals/muktar";
import generateNPC from "./generateNPC";
import { ENEMIES, TILES } from "./constants";
import { randomFromRange  } from "./utils";

export const onLevelLoad = () => {
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

    const monstersToGenerate = get("monster", { recursive: true });

    monstersToGenerate.forEach((newMonster, index) => {
        const monster = add([...TILES.monster(), sprite(newMonster.monsterType), pos(newMonster.pos), area(), body({ isStatic: true }, { monsterType: newMonster.monsterType })]);
    });


    const muktarStart = get("muktarStart", { recursive: true })[0];
    const muktar = add([...TILES.muktar(), pos(muktarStart.pos.x, muktarStart.pos.y)]);
    setGlobalMuktar(muktar);
    configMuktar(muktar);
};

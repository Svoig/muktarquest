export function randomFromRange(min, max) {
 return Math.floor(Math.random() * max - min + min);
};

export function randomColor(includeAlpha) {
    const color = [];

    const numToGenerate = includeAlpha ? 4 : 3;

    for (let i = 0; i < numToGenerate; i++) {
        color.push(randomFromRange(0, 255));
    }

    return color;
};

export function randomDelay(min, max) {
    const minimum = min || 0.25;
    const maximum = max || 1.0;

    return randomFromRange(minimum, maximum);
}

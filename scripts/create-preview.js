const { copyFileSync, mkdirSync } = require('node:fs');
const { dirname, join } = require('node:path');

const source = join(__dirname, '..', 'assets', 'portfolio-preview.svg');
const target = join(__dirname, '..', 'assets', 'portfolio-preview.generated.svg');

mkdirSync(dirname(target), { recursive: true });
copyFileSync(source, target);
console.log(`Preview generated at ${target}`);

const filename = process.argv[2];
if (!filename) {
    console.error('Please provide a filename.');
    process.exit(1);
}

import(`./${filename}`);

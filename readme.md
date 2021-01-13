## Install

    yarn init
    yarn add -D typescript
    npx tsc --init

Add to `package.json`:

    "scripts": {
        "build": "tsc"
      },

## Build TS Files

    yarn build  // transpile ts -> js
    node index.js  // run js files in node

## Add TS Node

This will allow us to point to a start file and watch for changes.

    yarn add -D ts-node ts-node-dev
    
Add to `package.json`:

    "scripts": {
        "start": "ts-node-dev --respawn src/index.ts",
        "build": "tsc"
      },

Add TS Support for Node and Express:

    yarn add @types/express @types/node

Add Ottoman JS"

    yarn add ottoman

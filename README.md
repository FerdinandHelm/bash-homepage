# My personal website

This is a functional Unix shell replica coded in next.js, including support for external scripts and escape sequences for text styling.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Run the development server:
   ```sh
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Building a module

The shell replica has a module system with an API. To build a module, add a `.js` file to the commands folder with the following template:

```js
import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo }, args) {
  // add code here
  return 0;
});
```

The first parameter of `importModule()` is the command to launch it. `import.meta.url` takes the module's filename as the command, e.g. `mkdir.js` can be launched with `mkdir`.

The second parameter is the module's code. It gets called with two parameters:
1. The app's API object (see below)
2. The arguments the command was launched with as a string array, e.g. when running `mkdir -p test`, args would be `['-p', 'test']`

## Module API

The module API contains the following functions:

### echo

Prints out text onto the shell. The text can be colored/styled using ANSI escape sequences.

Example: `echo('Hello world!')`

### setPlaylist

Plays an array of tracks using the shell's music player.

Example: `setPlaylist(['track1', 'track2'])` or `setPlaylist([])` to stop playback.
A library for interacting with SeisComP, the modular system for processing and distributing seismic data. Runs on Node
and in the browser. Developed with [bun.js](https://github.com/oven-sh/bun) (a Node.js alternative using
JavaScriptCore - you should try it! it's faster than Node and you don't have to build your TypeScript project to test
it).

## Installation

```bash
npm install seiscomp
```

## Documentation

[lyricalsoul.github.io/seiscomp](https://lyricalsoul.github.io/seiscomp/) - proudly generated
by [typedoc](https://typedoc.org/)!

## Features

Currently, seiscomp.js only supports a subset of the FDSNWS module. Support for seedlink is planned, using a modular
approach for maximum compatibility. If you need for a module to be implemented, do not hesitate on contacting by opening
an issue.

## Notes

- The library is still in development. Bugs may occur.

## Examples

```js
import { FDSNWS } from 'seiscomp'

const client = new FDSNWS('https://moho.iag.usp.br/fdsnws')

const events = await client.station.queryStation({
  networkCode: 'IU',
  channelCode: 'BHZ'
})
```


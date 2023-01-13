import { FDSNWS } from '../src/index.ts' // this will not work if you are on node.js!

const client = new FDSNWS('https://moho.iag.usp.br/fdsnws/')

await client.station.queryNetwork('IU')

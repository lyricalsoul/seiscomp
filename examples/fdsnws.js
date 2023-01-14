import { FDSNWS } from '../src/index.js' // this will not work if you are on node.js!

const client = new FDSNWS('https://moho.iag.usp.br/fdsnws/')

await client.station.queryNetwork('BL')
await client.station.query()
  .channel.network('BR')
  .channel.station('VIL?')
  .time.startAfter('2015-01-01')
  .finish()
  .then(console.log)
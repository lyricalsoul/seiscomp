import { SC3ResponseEntity, Station } from '../types/fdsnws.js'
import {
  BoxConstraints,
  ChannelConstraints,
  CircleConstraints,
  StationConstraints,
  TimeConstraints
} from './constraints.js'

/** @hidden */
type FinishingFunction = (string) => Promise<SC3ResponseEntity>

/**
 * A class for building SeisComP queries.
 * Based on the SeisComP FDSNWS request builder.
 * Supports most constraints, from time startAfter to bounding box.
 * Consult the documentation for more information.
 * @see https://www.seiscomp.de/doc/apps/fdsnws.html
 *
 * Service-specific constraints should be acessed using the service name. For example, the following code queries events with a magnitude up to 5 and a maximum depth of 100km.
 * ```javascript
 * await client.event.query()
 *   .event.maxMagnitude(5)
 *   .event.maxDepth(100)
 *   .finish()
 * ```
 * To know which constraints are service-specific, consult a SeisComP FDSNWS service builder.
 * - [Event service builder](https://moho.iag.usp.br/fdsnws/event/1/builder)
 * - [Station service builder](https://moho.iag.usp.br/fdsnws/station/1/builder)
 * - [Dataselect service builder](https://service.iris.edu/fdsnws/dataselect/docs/1/builder/)
 *
 * ⚠ Please note some services may **not** be available on your desired SeisComP instance. If you need help, please contact the system administrator.
 *
 * ⚠ Some constraints may **not** be available for certain services. For example, you cannot use `fdsnws_station`'s `excludeRestrictedChannels` on the event service.
 *
 *
 *
 * ### Query example
 * ```javascript
 * await client.station.query()
 *   .channel.network('IU')
 *   .channel.station('ANMO')
 *   .channel.location('00')
 *   .channel.code('BHZ')
 *   .channel.code('BHN')
 *   .circle.latitude(34.945)
 *   .circle.longitude(-106.457)
 *   .circle.radius(100)
 *   .time.startBefore('2019-01-01')
 *   .time.endBefore('2019-01-02')
 *   .finish()
 *   ```
 */
class QueryBuilder<T> {
  /** Time constraints. */
  public time: TimeConstraints<T> | undefined
  /** Circle constraints (geographical constraint). */
  public circle: CircleConstraints<T> | undefined
  /** Box constraints (geographical constraint). */
  public box: BoxConstraints<T> | undefined
  /** Channel (network, station, location, channel) constraints. */
  public channel: ChannelConstraints<T> | undefined
  /** Station constraints - only available when querying the station service. */
  public station: StationConstraints<Promise<Station[]>> | undefined

  /** @hidden */
  private readonly _finish: FinishingFunction

  /**
   * Creates a new QueryBuilder.
   * @hidden
   */
  constructor (enabledConstraints: string[], finishing: FinishingFunction) {
    if (enabledConstraints.includes('time')) this.time = new TimeConstraints(this)
    if (enabledConstraints.includes('geographical')) {
      this.circle = new CircleConstraints(this)
      this.box = new BoxConstraints(this)
    }
    if (enabledConstraints.includes('channel')) this.channel = new ChannelConstraints(this)
    if (enabledConstraints.includes('station')) this.station = new StationConstraints(this)

    this._finish = finishing
  }

  /**
   * Finishes the query and sends the request to the server.
   */
  public finish (): Promise<T> {
    return (this._finish(this.#build())) as Promise<T>
  }

  /**
   * Builds the query and returns the query string.
   * @internal
   */
  #build (): string {
    const constraints = ['format=sc3ml', 'nodata=404']
    if (this.time) constraints.push(this.time.build())
    if (this.circle) constraints.push(this.circle.build())
    if (this.box) constraints.push(this.box.build())
    if (this.channel) constraints.push(this.channel.build())
    if (this.station) constraints.push(this.station.build())
    return constraints.filter(a => !!a).join('&')
  }
}

export { QueryBuilder, FinishingFunction }
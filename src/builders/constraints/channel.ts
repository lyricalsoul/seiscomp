import { Constraint } from '../../structures/Constraint.js'

/**
 * Channel (network, station, channel and location code) constraints for query building.
 */
export class ChannelConstraints<T> extends Constraint<T> {
  constructor (builder) {
    super(builder)
  }

  /**
   * Sets the network code.
   * Wildcards are supported - e.g. `B?` will match all networks starting with `B`.
   */
  network (code: string) {
    this.set('network', code)
    return this.builder
  }

  /**
   * Sets the station code.
   * Wildcards are supported - e.g. `E???` will match all stations starting with `E`.
   */
  station (code: string) {
    this.set('station', code)
    return this.builder
  }

  /**
   * Sets the location code.
   * Are wildcards supported? Test it, because I don't know.
   */
  location (code: string) {
    this.set('location', code)
    return this.builder
  }

  /**
   * Sets the channel code.
   * Wildcards are supported - e.g. `H??` will match all channels starting with `H`.
   */
  code (code: string) {
    this.set('channel', code)
    return this.builder
  }
}
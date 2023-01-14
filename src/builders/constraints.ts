import { Constraint } from '../structures/Constraint.js'
import { Station } from '../types/fdsnws.js'

/**
 * Channel (network, station, channel and location code) constraints for query building.
 */
class ChannelConstraints<T> extends Constraint<T> {
  /** @hidden */
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

/**
 * Geographical constraints for query building.
 */
class CircleConstraints<T> extends Constraint<T> {
  /** @hidden */
  constructor (builder) {
    super(builder)
  }

  /**
   * Sets the latitude of the center of the circle.
   */
  latitude (lat: number | string) {
    this.set('latitude', lat.toString())
    return this.builder
  }

  /**
   * Sets the longitude of the center of the circle.
   */
  longitude (lon: number | string) {
    this.set('longitude', lon.toString())
    return this.builder
  }

  /**
   * Sets the maximum radius of the circle.
   */
  maxRadius (radius: number | string) {
    this.set('maxradius', radius.toString())
    return this.builder
  }

  /**
   * Sets the minimum radius of the circle.
   */
  minRadius (radius: number | string) {
    this.set('minradius', radius.toString())
    return this.builder
  }
}

/**
 * Geographical constraints for query building.
 */
class BoxConstraints<T> extends Constraint<T> {
  /** @hidden */
  constructor (builder) {
    super(builder)
  }

  /**
   * Sets the maximum latitude of the box.
   */
  maxLatitude (lat: number | string) {
    this.set('maxlatitude', lat.toString())
    return this.builder
  }

  /**
   * Sets the minimum latitude of the box.
   */
  minLatitude (lat: number | string) {
    this.set('minlatitude', lat.toString())
    return this.builder
  }

  /**
   * Sets the maximum longitude of the box.
   */
  maxLongitude (lon: number | string) {
    this.set('maxlongitude', lon.toString())
    return this.builder
  }

  /**
   * Sets the minimum longitude of the box.
   */
  minLongitude (lon: number | string) {
    this.set('minlongitude', lon.toString())
    return this.builder
  }
}

/**
 * Constraints specific to the station service.
 *
 * Some constraints (update after) are not implemented because SeisComP itself does not support them.
 */
class StationConstraints<T extends Promise<Station[]>> extends Constraint<T> {
  /** @hidden */
  constructor (builder) {
    super(builder)
  }

  /**
   * Exclude restricted channels from the response.
   */
  excludeRestrictedChannels () {
    this.set('includerestricted', 'false')
    return this.builder
  }

  /**
   * Include data availability information in the response.
   */
  includeAvailability () {
    this.set('includeavailability', 'true')
    return this.builder
  }

  /**
   * Match time series.
   */
  matchTimeSeries () {
    this.set('matchtimeseries', 'true')
    return this.builder
  }
}

/**
 * Time constraints for query building.
 */
class TimeConstraints<T> extends Constraint<T> {
  /** @hidden */
  constructor (builder) {
    super(builder)
  }

  /**
   * Selects data that starts AFTER the given time.
   */
  startAfter (date: Date | string) {
    this.set('startafter', date.toString())
    return this.builder
  }

  /**
   * Selects data that starts BEFORE the given time.
   */
  startBefore (date: Date | string) {
    this.set('startbefore', date.toString())
    return this.builder
  }

  /**
   * Selects data that ends AFTER the given time.
   */
  endAfter (date: Date | string) {
    this.set('endafter', date.toString())
    return this.builder
  }

  /**
   * Selects data that ends BEFORE the given time.
   */
  endBefore (date: Date | string) {
    this.set('endbefore', date.toString())
    return this.builder
  }

  /**
   * Selects data that starts ON THE EXACT given time.
   */
  startTime (date: Date | string) {
    this.set('starttime', date.toString())
    return this.builder
  }

  /**
   * Selects data that ends ON THE EXACT given time.
   */
  endTime (date: Date | string) {
    this.set('endtime', date.toString())
    return this.builder
  }
}

export {
  ChannelConstraints,
  CircleConstraints,
  BoxConstraints,
  StationConstraints,
  TimeConstraints
}
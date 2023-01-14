import { Constraint } from '../../structures/Constraint.js'

/**
 * Geographical constraints for query building.
 */
export class CircleConstraints<T> extends Constraint<T> {
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

export class BoxConstraints<T> extends Constraint<T> {
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
import { Constraint } from '../../structures/Constraint.js'
import { Station } from '../../types/fdsnws.js'

/**
 * Constraints specific to the station service.
 *
 * Some constraints (update after) are not implemented because SeisComP itself does not support them.
 */
export class StationConstraints<T extends Promise<Station[]>> extends Constraint<T> {
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
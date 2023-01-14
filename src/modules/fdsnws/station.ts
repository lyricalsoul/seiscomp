import { Network, Station, StationQuery } from '../../types/fdsnws.js'
import { sc3mlQueryToNetwork, sc3mlStationToStation, stationQueryToQuery, toArray } from '../../utilities.js'
import FDSNWS from './index.js'
import FDSNWSService from '../../structures/FDSNWSService.js'
import { QueryBuilder } from '../../builders/queryBuilder.js'

/**
 * The StationService class, used to interact with the `fdsnws_station` service.
 *
 * ⚠ The `station` service may **not** be available on your desired SeisComP instance.
 *
 * If you are experiencing issues, please check if the service is available on the desired instance by visiting the FDSNWS URL in your browser.
 * Contact the system administrator for further assistance.
 *
 * @see https://www.seiscomp.de/doc/apps/fdsnws.html#station
 */
export class StationService extends FDSNWSService {
  private fdsnws: FDSNWS

  constructor (fdsnws: FDSNWS) {
    super()
    this.fdsnws = fdsnws
  }

  /**
   * Returns a query builder for the `station` service.
   * Refer to the query builder documentation for usage.
   *
   * ⚠ Using features that aren't enabled on the server **will** result in an error.
   *
   * {@link builders.queryBuilder.QueryBuilder}
   */
  query (): QueryBuilder<Station[]> {
    return new QueryBuilder(
      ['channel', 'geographical', 'time', 'station'],
      (query) => this._queryStation(query)
    )
  }


  /** Queries stations from the FDSNWS service. */
  async queryStation (data: StationQuery): Promise<Station[]> {
    return this._queryStation(stationQueryToQuery(data))
  }

  /** @hidden */
  async _queryStation (data: Record<string, any> | string): Promise<Station[]> {
    return this.fdsnws._request<Record<string, any>>('/station/1/query', data, true)
      .then((r) => {
        console.log(r)
        return r
      })
      .then((r) => r ? toArray(r.seiscomp.Inventory.network.station).map(sc3mlStationToStation) : [])
  }


  /**
   * Returns data about a network.
   *
   * ### Example
   * ```js
   * > await fdsnws.station.queryNetwork('GR')
   * [{
   *     network data
   * }]
   *
   * > await fdsnws.station.queryNetwork('G?') // Wildcards are supported
   * [{
   *    network data
   * }, {
   *   network data
   * }]
   * ```
   */
  async queryNetwork (code: string): Promise<Network[] | undefined> {
    return this.fdsnws._request<Record<string, any>>('/station/1/query', { net: code, format: 'sc3ml' }, true)
      .then((r) => r.seiscomp?.Inventory?.network
        ? toArray(r.seiscomp.Inventory.network).map(sc3mlQueryToNetwork)
        : undefined)
  }

  /** Returns the version of the FDSNWS_STATION service. */
  async version (): Promise<string> {
    return this.fdsnws._request<string>('/station/1/version', { format: 'text' })
  }
}
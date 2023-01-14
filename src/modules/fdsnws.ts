import SeisModule from '../structures/SeisModule.js'
import { get } from '../http.js'
import FDSNWSService from '../structures/FDSNWSService.js'
import { QueryBuilder } from '../builders/queryBuilder.js'
import { Network, Station, StationQuery } from '../types/fdsnws.js'
import { deprecate } from 'util'
import { sc3mlQueryToNetwork, sc3mlStationToStation, stationQueryToQuery, toArray } from '../utilities.js'

/**
 * The StationService class, used to interact with the `fdsnws_station` service.
 *
 * ⚠ The `station` service may **not** be available on your desired SeisComP instance.
 *
 * ⚠ Please note that using features (such as some constraints) that aren't enabled on the server **will** result in an error.
 *
 * If you are experiencing issues, please check if the service is available on the desired instance by visiting the FDSNWS URL in your browser.
 * Contact the system administrator for further assistance.
 *
 * @see https://www.seiscomp.de/doc/apps/fdsnws.html#station
 */
class StationService extends FDSNWSService {
  /** @hidden */
  private fdsnws: FDSNWS

  /** @hidden */
  constructor (fdsnws: FDSNWS) {
    super()
    this.fdsnws = fdsnws
  }

  /**
   * Returns a query builder for the `station` service.
   * Refer to the query builder documentation for usage.
   * {@link builders/queryBuilder.QueryBuilder QueryBuilder documentation}
   *
   * ⚠ Please note that using features that aren't enabled on the server **will** result in an error.
   *
   */
  query (): QueryBuilder<Station[]> {
    return new QueryBuilder(
      ['channel', 'geographical', 'time', 'station'],
      (query) => this._queryStation(query)
    )
  }

  /**
   * Queries stations from the FDSNWS service
   * @deprecated Use {@link StationService.query} instead. This method will be removed in a future release.
   */
  async queryStation (data: StationQuery): Promise<Station[]> {
    deprecate(() => {
    }, 'queryStation is deprecated. Use query instead. This method will be removed in a future release.')
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

/**
 * The FDSNWS module, used to interact with the FDSNWS services.
 * @see https://www.seiscomp.de/doc/apps/fdsnws.html
 *
 * ⚠ Please note that using features that aren't enabled on the server **will** result in an error.
 * ⚠ The FDSNWS server may **not** be available on your desired SeisComP instance.
 */
class FDSNWS extends SeisModule {
  /** The URL of the FDSNWS server. */
  url: string

  /** The StationService class, used to interact with the fdsnws_station service. */
  station = new StationService(this)

  /**
   * Creates a new FDSNWS module.
   */
  public constructor (url: string) {
    super()
    this.url = url.endsWith('/') ? url.slice(0, -1) : url
  }

  /** @hidden */
  _request<T> (path: string, query: Record<string, any> | string, xml: boolean = false): Promise<T | undefined> {
    return get(this.url + path, { query, xml }).catch((err) => {
      if (err.status === 404) return undefined
      throw err
    }) as Promise<T | undefined>
  }
}

export { FDSNWS, StationService }
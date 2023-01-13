/// StationService is a class that interacts with the fdsnws_station service.
import { Network, Station, StationQuery } from '../../types/fdsnws.js'
import { sc3mlQueryToNetwork, sc3mlStationToStation, stationQueryToQuery, toArray } from '../../utilities.js'
import FDSNWS from './index.js'
import FDSNWSService from '../../structures/FDSNWSService.js'

/** The StationService class, used to interact with the fdsnws_station service. */
export class StationService extends FDSNWSService {
  private fdsnws: FDSNWS

  constructor (fdsnws: FDSNWS) {
    super()
    this.fdsnws = fdsnws
  }

  /** Queries stations from the FDSNWS service. */
  async queryStation (data: StationQuery): Promise<Station[]> {
    const r = await this.fdsnws._request<Record<string, any>>('/station/1/query', stationQueryToQuery(data), true)
      .then((r) => r ? r.seiscomp.Inventory.network.station.map?.(sc3mlStationToStation) ?? [] : [])
    console.log(r)
    return r
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
    const r = await this.fdsnws._request<Record<string, any>>('/station/1/query', { net: code, format: 'sc3ml' }, true)
      .then((r) => r.seiscomp?.Inventory?.network
        ? toArray(r.seiscomp.Inventory.network).map(sc3mlQueryToNetwork)
        : undefined)
    console.log(r)
    return r
  }

  /** Returns the version of the FDSNWS_STATION service. */
  async version (): Promise<string> {
    return this.fdsnws._request<string>('/station/1/version', { format: 'text' })
  }
}
import SeisModule from '../../structures/SeisModule.js'
import { get } from '../../http.js'
import { StationService } from './station.js'

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
  _request<T> (path: string, query: Record<string, any>, xml: boolean = false): Promise<T | undefined> {
    return get(this.url + path, { query, xml }).catch((err) => {
      if (err.status === 404) return undefined
      throw err
    }) as Promise<T | undefined>
  }
}

export default FDSNWS
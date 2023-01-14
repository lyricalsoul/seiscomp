export interface StationQuery {
  /** Network code (optional) */
  networkCode?: string
  /** Channel code (optional) */
  channelCode?: string
  /** Station code (optional) */
  stationCode?: string
  /** Location code (optional) (00 is not the same as empty! Be careful!) */
  locationCode?: string
  /** Level (response by default, do not specify unless you know what you are doing!) */
  level?: string
}

/** Describes any entity (such as a station) returned by SC3. */
export interface SC3ResponseEntity {
}

/** Describes the location of a station. */
export interface StationLocation {
  /** The location name. Usually `City - State`. */
  name: string
  /** The location country. */
  country: string
}

/** Describes a station. */
export interface Station extends SC3ResponseEntity {
  /** The station description - mostly used as a title. */
  description?: string
  /** The station latitude. */
  latitude: number
  /** The station longitude. */
  longitude: number
  /** The station elevation. */
  elevation: number
  /** The station location. */
  location: StationLocation
  /** Station remarks - some networks use this to display what seismographs are installed at the station. */
  remark?: string
  /** If the station is restricted. */
  restricted: boolean
  /** If the station is active. */
  active: boolean
  /** If the station is shared. */
  shared: boolean
  /** The station start date. */
  startDate: Date
  /** The station end date, if the station is inactive. Check if the station is active with the `active` property. */
  endDate?: Date
  /** Station affiliation (the instituion that operates the station). */
  affiliation: string
}

/** Describes a network. */
export interface Network {
  /** The start date of the network. */
  startDate: Date
  /** The network description. */
  description?: string
  /** The instituion(s) that operate the network. */
  institutions?: string
  /** The region of the network. Undefined if the network is global, usually. The Global Seismograph Network, ran by the IRIS/USGS, for example, does not send this property. */
  region?: string
  /** The network type. */
  type?: string
  /** The network class. */
  networkClass: string
  /** If the network is restricted. */
  restricted: boolean
  /** If the network is active. */
  active: boolean
  /** If the network is shared. */
  shared: boolean
  /** The network end date, if the network is inactive. Check if the network is active with the `active` property. */
  endDate?: Date
  /** Stations in the network. */
  stations: Station[]
}

export interface EventQuery {

}
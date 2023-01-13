import { XMLParser } from 'fast-xml-parser'
import { Network, Station, StationQuery } from './types/fdsnws.js'

export const XML = new XMLParser()

export const toArray = <T> (value: T | T[]): T[] => Array.isArray(value) ? value : (!value ? [] : [value])
export const sc3mlStationToStation = (data: Record<string, unknown>): Station => {
  return {
    description: data.description as string,
    latitude: data.latitude as number,
    longitude: data.longitude as number,
    elevation: data.elevation as number,
    location: {
      name: data.place as string,
      country: data.country as string
    },
    remark: data.remark as string,
    restricted: data.restricted as boolean,
    active: !data.end,
    shared: data.shared as boolean,
    startDate: new Date(data.start as string),
    endDate: data.end && new Date(data.end as string),
    affiliation: data.affiliation as string
  }
}
export const sc3mlQueryToNetwork = (data: Record<string, unknown>): Network => {
  return {
    startDate: new Date(data.start as string),
    type: data.type as string,
    description: data.description as string,
    institutions: data.institutions as string,
    region: data.region as string,
    networkClass: data.netClass as string,
    restricted: data.restricted as boolean,
    active: !data.end,
    shared: data.shared as boolean,
    endDate: data.end && new Date(data.end as string),
    stations: toArray<Record<string, any>>(data.station).map(sc3mlStationToStation)
  }
}
export const stationQueryToQuery = (query: StationQuery): Record<string, any> => {
  const q: Record<string, any> = {}
  q.nodata = '404'
  q.format = 'sc3ml'

  if (query.networkCode) q.net = query.networkCode
  if (query.channelCode) q.cha = query.channelCode
  if (query.stationCode) q.sta = query.stationCode
  if (query.locationCode) q.loc = query.locationCode
  if (query.level) q.level = query.level || 'response'

  return q
}
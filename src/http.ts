import { XML } from './utilities.js'

export class HTTPError extends Error {
  status: number
  body: string

  constructor (status: number, body: string) {
    super(`HTTP Error ${status}`)
    this.status = status
    this.body = body
  }
}

interface HTTPOptions {
  // Query parameters to be added to the request URL (if any).
  query?: Record<string, any>
  // Specifies if the response is XML.
  xml?: boolean
}

const objectToQuery = (obj: Record<string, any>): string => Object.entries(obj)
  .map((values) => values.map(encodeURIComponent).join('='))
  .join('&')

const request = (method: string, url: string, options: HTTPOptions = {}): Promise<string> => {
  if (options.query) {
    url += '?' + objectToQuery(options.query)
  }

  return fetch(url, {
    method
  })
    .then(async (r) => {
      const body = await r.text()
      if (!r.ok) throw new HTTPError(r.status, body)
      return body
    })
    .then((t) => options.xml ? XML.parse(t) : t)
}

export const get = (url: string, options?: HTTPOptions): Promise<string> => request('GET', url, options)

import { XML } from './utilities.js'

const ASCII_RESET = '\x1b[0m'
const ASCII_ITALIC = '\x1b[3m'

export class HTTPError extends Error {
  status: number
  body: string

  constructor (status: number, body: string) {
    super(`HTTP Error ${status}. ${body ? 'The body follows below.\n' + ASCII_RESET + ASCII_ITALIC + body.trim() : 'No body.'}`)
    this.status = status
    this.body = body
  }
}

interface HTTPOptions {
  // Query parameters to be added to the request URL (if any).
  query?: Record<string, any> | string
  // Specifies if the response is XML.
  xml?: boolean
}

const objectToQuery = (obj: Record<string, any>): string => Object.entries(obj)
  .map((values) => values.map(encodeURIComponent).join('='))
  .join('&')

const request = (method: string, url: string, options: HTTPOptions = {}): Promise<string> => {
  if (options.query && typeof options.query !== 'string') {
    url += '?' + objectToQuery(options.query as Record<string, any>)
  } else if (options.query) {
    url += '?' + options.query
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

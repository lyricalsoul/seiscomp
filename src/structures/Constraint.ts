import { QueryBuilder } from '../builders/queryBuilder.js'

/** @hidden */
export class Constraint<T> {
  builder: QueryBuilder<T>
  /** @hidden */
  private parameters: Record<string, string> = {}

  constructor (builder: QueryBuilder<T>) {
    this.builder = builder
  }

  /**
   * @hidden
   * @private
   */
  set (key: string, value: string): void {
    if (this.parameters[key]) {
      this.parameters[key] += ',' + value
    } else {
      this.parameters[key] = value
    }
  }

  build (): string {
    return Object.entries(this.parameters)
      .map((values) => values.map(encodeURIComponent).join('='))
      .join('&')
  }
}
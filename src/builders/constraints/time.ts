import { Constraint } from '../../structures/Constraint.js'

/**
 * Time constraints for query building.
 */
export class TimeConstraints<T> extends Constraint<T> {
  constructor (builder) {
    super(builder)
  }

  /**
   * Selects data that starts AFTER the given time.
   */
  startAfter (date: Date | string) {
    this.set('startafter', date.toString())
    return this.builder
  }

  /**
   * Selects data that starts BEFORE the given time.
   */
  startBefore (date: Date | string) {
    this.set('startbefore', date.toString())
    return this.builder
  }

  /**
   * Selects data that ends AFTER the given time.
   */
  endAfter (date: Date | string) {
    this.set('endafter', date.toString())
    return this.builder
  }

  /**
   * Selects data that ends BEFORE the given time.
   */
  endBefore (date: Date | string) {
    this.set('endbefore', date.toString())
    return this.builder
  }

  /**
   * Selects data that starts ON THE EXACT given time.
   */
  startTime (date: Date | string) {
    this.set('starttime', date.toString())
    return this.builder
  }

  /**
   * Selects data that ends ON THE EXACT given time.
   */
  endTime (date: Date | string) {
    this.set('endtime', date.toString())
    return this.builder
  }
}
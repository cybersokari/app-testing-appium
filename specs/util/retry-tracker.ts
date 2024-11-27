interface IRetryTracker {
  currentRetry: number
  reset(): void
  increment(): void
  getCount(): number
}

class RetryTracker implements IRetryTracker {
  private static instance: RetryTracker
  public currentRetry: number = 0

  private constructor() {}

  public static getInstance(): RetryTracker {
    if (!RetryTracker.instance) {
      RetryTracker.instance = new RetryTracker()
    }
    return RetryTracker.instance
  }

  public getCount() {
    return this.currentRetry
  }

  public increment() {
    this.currentRetry++
  }
  public reset() {
    this.currentRetry = 0
  }
}

export {RetryTracker}
export type {IRetryTracker}

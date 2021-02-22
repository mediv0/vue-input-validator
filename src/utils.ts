export const isPromise = <T>(fn: Promise<T>): boolean => (fn?.then && fn?.catch ? true : false);

export const isPromise = <T>(fn: Promise<T>): boolean => (fn?.then && fn?.catch ? true : false);
export const isUndefined = <T>(val: T): boolean => typeof val === "undefined";

export const isPromise = <T>(fn: Promise<T>): boolean => (fn?.then && fn?.catch ? true : false);
export const isUndefined = <T>(val: T): boolean => typeof val === "undefined";

export const createObjectFromArray = (keys: string[], values: boolean[]) => {
    const o: {
        [index: string]: boolean;
    } = {};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = values[i];
        o[key] = value;
    }

    return o;
};

export const getFailedValidationByKeys = (validations: { [index: string]: boolean }) => {
    const failedKeys: string[] = [];
    Object.keys(validations).forEach(key => {
        if (validations[key] === false) {
            failedKeys.push(key);
        }
    });

    return failedKeys;
};

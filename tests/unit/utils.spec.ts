import { createObjectFromArray, getFailedValidationByKeys, isPromise, isUndefined } from "@/utils";

describe("utils", () => {
    test("isPromise should return true if given function is promise", () => {
        const fn1 = () => {
            return new Promise(() => {});
        }

        const fn2 = async () => {
            return await fn1();
        }


        const noPromiseFn = () => {}


        expect(isPromise(fn1())).toBe(true);
        expect(isPromise(fn2())).toBe(true);
        expect(isPromise(noPromiseFn() as any)).toBe(false)
    })


    test("isUndefined should return true if given value is undefined", () => {
        const g = undefined;

        expect(isUndefined(g)).toBe(true);
        expect(isUndefined(1)).toBe(false);
    })

    test("createObjectFromArray should create key value pairs", () => {
        const keys = ["test1", "test2", "test3"];
        const values = [true, false, true];

        expect(createObjectFromArray(keys, values)).toEqual({
            test1: true,
            test2: false,
            test3: true
        })
    })

    test("getFailedValidationByKeys should return keys of failed validations", () => {
        const dummyResult = {
            test1: false,
            test2: true,
            test3: true,
            test4: false,
        }

        expect(getFailedValidationByKeys(dummyResult)).toEqual(["test1", "test4"]);
    });
})
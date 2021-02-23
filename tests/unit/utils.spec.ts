import { isPromise, isUndefined } from "@/utils";

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
})
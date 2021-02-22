import { isPromise } from "@/utils";

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
})
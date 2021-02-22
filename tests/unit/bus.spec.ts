import Bus from "../../src/validatorBus";

describe("validator bus", () => {
    it("should have one instance all the time", () => {
        const b1 = new Bus();
        const b2 = new Bus();

        expect(b1).toEqual(b2);
    });

    it("should call subscribed function when calling request", () => {
        const b = new Bus();

        expect(b.request("test")).toBe(false);
    });

    it("should register new subscriber when calling sub", () => {
        const b = new Bus();
        const fnMock = () => {};
        b.sub("random", fnMock);

        const r = Reflect.get(b, "subscribers");

        expect(r["random"]).toBeTruthy();
        expect(r["random"]).toEqual(fnMock);
    });

    it("should call subscribed function", () => {
        const b = new Bus();

        const fnMock = jest.fn(() => true);
        b.sub("random", fnMock);

        expect(fnMock).not.toHaveBeenCalled();

        const result = b.request("random");
        expect(fnMock).toHaveBeenCalled();
        expect(result).toBe(true);
    });
});

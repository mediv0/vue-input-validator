import Bus from "../../src/validatorBus";

describe("validator bus", () => {
    it("should have one instance all the time", () => {
        const b1 = new Bus();
        const b2 = new Bus();

        expect(b1).toEqual(b2);
    });

    it("should return false if event is not defined", () => {
        const b = new Bus();

        expect(b.request("validationStatus", "random key")).toBe(false);
    });

    it("should subscribe multiple events if their eventName is same", () => {
        const b = new Bus();

        b.sub("testEvent" as any, () => {});
        b.sub("testEvent" as any, () => {});
        b.sub("testEvent" as any, () => {});
        b.sub("testEvent" as any, () => {});

        expect(Reflect.get(b, "subscribers").testEvent.length === 4);
    })

    it("should call every callback that registerd in setErrors event if key is not provided", () => {
        const b = new Bus();
        const cbMock = jest.fn();

        b.sub("setErrors", cbMock);
        b.sub("setErrors", cbMock);
        b.sub("setErrors", cbMock);
        b.sub("setErrors", cbMock);

        b.request("setErrors");
        expect(cbMock).toHaveBeenCalledTimes(4);
    });

    it("should call setErrors with given key", () => {
        const b = new Bus();
        const cbMock = jest.fn();
        const cbMock2 = jest.fn();

        b.sub("setErrors", cbMock, "test");
        b.sub("setErrors", cbMock2, "randomKey");

        b.request("setErrors", "test");
        expect(cbMock).toHaveBeenCalled();
        expect(cbMock2).not.toHaveBeenCalled();
    });

    it("should throw an error if isValid called without key", () => {
        const b = new Bus();
        b.sub("validationStatus", () => {});
        expect(() => {
            b.request("validationStatus");
        }).toThrow();
    })

    it("should return value if calling validationStatus", () => {
        const b = new Bus();

        b.sub("validationStatus", () => true, "test");

        const result = b.request("validationStatus", "test");

        expect(result).toBe(true);
    });
});

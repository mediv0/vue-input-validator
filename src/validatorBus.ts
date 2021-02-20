const Bus = class ValidatorBus {
    static instance: ValidatorBus;
    private subscribers: { [index: string]: Function } = {};

    constructor() {
        if (ValidatorBus.instance) {
            return ValidatorBus.instance;
        }

        ValidatorBus.instance = this;
    }

    public request(name: string): false | any {
        const _sub = this.subscribers[name];
        return _sub ? _sub() : false;
    }

    public sub(name: string, cb: Function): void {
        this.subscribers[name] = cb;
    }
};

export default Bus;

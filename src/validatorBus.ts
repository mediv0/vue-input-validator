import { eventSubscribersItemList, eventType, IeventSubscribers, IsubscribersObjectType } from "./types";

const Bus = class ValidatorBus {
    static instance: ValidatorBus;
    private subscribers: IeventSubscribers = {};

    constructor() {
        if (ValidatorBus.instance) {
            return ValidatorBus.instance;
        }

        ValidatorBus.instance = this;
    }

    public request(name: eventType, requestkey?: string): boolean | never | undefined {
        const _sub = this.subscribers[name];

        if (_sub) {
            const _cb = _sub.find(o => o.key === requestkey);
            if (name === "validationStatus" || name === "validate") {
                return this.handleValidationStatus(_cb);
            } else {
                this.handleSetErrors(_cb, _sub);
            }
        } else {
            // convert to throw error
            throw new Error(`event ${name} does not have any caller,`);
        }
    }

    public sub(event: eventType, cb: Function, key = ""): void {
        if (!this.subscribers[event]) {
            this.subscribers[event] = []; // init empty list
        }
        this.subscribers[event].push({
            key: key,
            handler: cb
        });
    }

    private handleValidationStatus(_cb: IsubscribersObjectType | undefined): boolean | never {
        if (_cb) {
            return _cb.handler();
        } else {
            throw new Error("key is undefiend, please provide a key to use this method");
        }
    }
    private handleSetErrors(_cb: IsubscribersObjectType | undefined, _subs: eventSubscribersItemList): void {
        if (_cb) {
            _cb.handler();
        } else {
            _subs.forEach(sub => {
                sub.handler();
            });
        }
    }
};

export default Bus;

import { checkPropertyItemsType, functionOrRegex, IchecksProp } from "@/types";
import { CreateElement } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Bus from "../validatorBus";
@Component
export default class Validator extends Vue {
    // ------------------------------------------------------------------------------
    // PROPS
    // ------------------------------------------------------------------------------
    @Prop() readonly success!: string;
    @Prop() readonly failed!: string;
    @Prop() readonly unchecked!: string;
    @Prop() readonly checks!: IchecksProp;
    @Prop() readonly watcher!: string;

    // ------------------------------------------------------------------------------
    // DATA
    // ------------------------------------------------------------------------------
    private validator = {
        strategy: new WeakMap(),
        set(key: functionOrRegex, strategy: Function) {
            this.strategy.set(key, strategy);
        },
        test(key: functionOrRegex, args: string) {
            const _fn = this.strategy.get(key);
            return _fn(key, args);
        }
    };

    private colorTable = this.setColorTable();

    // To track the status of the current element in the .x_input_validator__bars__bar Class
    private watchBarDiv = 0;

    // make sure callback runs once
    private once = false;

    // ------------------------------------------------------------------------------
    // WATCH
    // ------------------------------------------------------------------------------
    @Watch("watcher")
    onInputValueChanged(val: string): void {
        if (!this.checks.disable) {
            const { items } = this.checks;
            this.runTests(val, items);
        }
    }

    // ------------------------------------------------------------------------------
    // COMPUTED PROPERTIES
    // ------------------------------------------------------------------------------

    public get color() {
        return this.colorTable;
    }

    // ------------------------------------------------------------------------------
    // LIFE CYCLE
    // ------------------------------------------------------------------------------
    public created(): void {
        const { items } = this.checks;
        this.validateTest(items);
        this.setStrategies(items);
    }

    public mounted(): void {
        // EVENT LISETNER
        const bus = new Bus();
        // $validator.isValid event
        bus.sub("validationStatus", () => this.watchBarDiv === this.checks.items.length - 1, this.checks.key);
        bus.sub("setErrors", this.setErrors, this.checks.key);
    }

    // #region  METHODS

    setColorForBarDiv(active: number, color: string): void {
        const _el = this.$refs[`bar${active}`] as HTMLDivElement;
        _el.style.backgroundColor = color;
    }

    setSuccess(i: number): void {
        const _length = this.checks.items.length;
        if (this.watchBarDiv === _length - 1) {
            this.triggerCallbackOnce(this.checks.onSuccess as Function);
        }

        this.setColorForBarDiv(this.watchBarDiv, this.success);
        this.colorTable[i] = this.success;

        if (this.watchBarDiv < _length - 1) {
            this.watchBarDiv += 1;
        }
    }

    setUnchecked(i: number): void {
        this.setColorForBarDiv(this.watchBarDiv, this.unchecked);
        this.colorTable[i] = this.unchecked;

        if (this.watchBarDiv > 0) {
            this.watchBarDiv -= 1;
        }

        this.once = false;
    }

    triggerCallbackOnce(fn: Function): void {
        if (fn) {
            if (this.once) {
                return;
            }

            this.once = true;
            fn();
        }
    }

    // ------------------------------------------------------------------------------
    // CHECKING USER TESTS
    // ------------------------------------------------------------------------------
    runTests(value: string, tests: checkPropertyItemsType): void {
        tests.forEach((t, i) => {
            const { test } = t;
            const result = this.validator.test(test, value);

            if (result) {
                this.setSuccess(i);
            } else {
                this.setUnchecked(i);
            }
        });
    }

    validateTest(tests: checkPropertyItemsType): void {
        tests.forEach(t => {
            const { test } = t;
            if (!(test instanceof RegExp || test instanceof Function)) {
                throw new Error(`your test need to be typeof Regex or Function`);
            }
        });
    }

    setStrategies(tests: checkPropertyItemsType): void {
        tests.forEach(t => {
            const { test } = t;
            if (test instanceof RegExp) {
                this.validator.set(test, this.regexStrategy);
            } else {
                this.validator.set(test, this.functionStrategy);
            }
        });
    }
    regexStrategy(regex: RegExp, args: string): boolean {
        return regex.test(args);
    }
    functionStrategy(fn: Function, args: string): boolean {
        const _fn = fn(args);

        if (_fn === undefined) {
            throw new Error("one of your functions not returning any boolean value");
        }
        return _fn;
    }

    // ------------------------------------------------------------------------------
    // SETTING COLORS
    // ------------------------------------------------------------------------------
    private setColorTable(): Record<string, string> {
        const _o: { [index: string]: string } = {};
        Object.keys(this.checks.items).forEach((name, i) => {
            _o[i] = this.unchecked;
        });

        return _o;
    }

    // convert every gray to failed color
    private setErrors(): void {
        Object.values(this.colorTable).forEach((color, i) => {
            if (color === this.unchecked) {
                this.colorTable[i] = this.failed;
            }
        });
    }

    //#endregion

    // ------------------------------------------------------------------------------
    // TEMPLATE
    // ------------------------------------------------------------------------------
    render(h: CreateElement) {
        return (
            <div class="x_input_validator">
                {!this.checks.hideLines && (
                    <div class="x_input_validator__bars">
                        {this.checks.items.map((item, i) => {
                            return <div ref={`bar${i}`} class="x_input_validator__bars__bar" style={{ backgroundColor: this.unchecked }}></div>;
                        })}
                    </div>
                )}

                {!this.checks.hideLabels && (
                    <div class="x_input_validator__labels">
                        {this.checks.items.map((item, i) => {
                            return (
                                <div class="x_input_validator__labels__label">
                                    <div class="x_input_validator__labels__label__check" style={{ backgroundColor: this.color[i], width: `${this.checks.circleSize || 8}px`, height: `${this.checks.circleSize || 8}px` }}></div>
                                    <p style={{ color: this.color[i] }}>{item.label}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}

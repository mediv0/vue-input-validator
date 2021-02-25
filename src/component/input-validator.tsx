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
    @Prop() readonly el!: HTMLElement;

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

    // make sure callback runs once
    private once = false;

    // debounce timer handler
    private timer = 0;

    // validation default value when onError is set
    private showOnErrorMsg = false;

    // ------------------------------------------------------------------------------
    // WATCH
    // ------------------------------------------------------------------------------
    @Watch("watcher")
    onInputValueChanged(val: string): void {
        if (!this.checks.disable && !this.checks.onError) {
            clearTimeout(this.timer);

            this.timer = setTimeout(() => {
                const { items } = this.checks;
                this.runTests(val, items);
            }, this.checks.debounce);
        }
    }

    // ------------------------------------------------------------------------------
    // COMPUTED PROPERTIES
    // ------------------------------------------------------------------------------

    public get color() {
        return this.colorTable;
    }

    public get getBarColor() {
        // sorting color table to always show colors from left to right for line elements even if the last test passes
        const sortedColorTable = this.updateLineColors(this.colorTable);
        return sortedColorTable;
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

        const key = this.checks.key;

        if (!this.checks.onError) {
            bus.sub(
                "validationStatus",
                () => {
                    return this.isOnSuccessValid();
                },
                key
            );
            bus.sub("setErrors", this.setErrors, key);
        } else {
            bus.sub("validate", this.validateOnError, key);
            bus.sub("setOnErrors", this.setOnErrors, key);
        }
    }

    // #region  METHODS

    updateLineColors(colorTable: Record<string, string>): { [index: string]: string } {
        // we sort color table
        const values = Object.values(colorTable);

        values.sort(a => {
            if (a === this.success) return -1;
            else return 1;
        });

        const sortedTable: {
            [index: number]: string;
        } = {};
        for (let i = 0; i < values.length; i++) {
            sortedTable[i] = values[i];
        }

        return sortedTable;
    }

    setSuccess(i: number): void {
        this.colorTable[i] = this.success;

        if (this.isOnSuccessValid()) {
            this.triggerCallbackOnce(this.checks.onSuccess as Function);
        }
    }

    setUnchecked(i: number): void {
        this.colorTable[i] = this.unchecked;
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
    async runTests(value: string, tests: checkPropertyItemsType): Promise<boolean | void> {
        const validationResults: Array<boolean> = [];

        for (let i = 0; i < tests.length; i++) {
            let result = false;

            try {
                const { test } = tests[i];
                result = await this.validator.test(test, value);
            } catch (e) {
                result = false;
            }

            validationResults.push(result);
        }

        if (this.checks.onError) {
            return validationResults.every(r => r === true);
        } else {
            this.setValidatorLineAndLabelColors(validationResults);
        }
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

    async validateOnError(): Promise<boolean> {
        this.showOnErrorMsg = false;
        this.el.style.border = "";
        const result = await this.runTests(this.watcher, this.checks.items);

        return Promise.resolve(result as boolean);
    }

    isOnSuccessValid() {
        const colors = Object.values(this.colorTable);
        return colors.every(c => c === this.success);
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

    // set red color for onError message
    setOnErrors(): void {
        this.checks.onError?.highlight && (this.el.style.border = `1px solid ${this.checks.onError.color || this.failed}`);
        this.showOnErrorMsg = true;
    }

    setValidatorLineAndLabelColors(results: boolean[]): void {
        results.forEach((res, i) => {
            if (res) {
                this.setSuccess(i);
            } else {
                this.setUnchecked(i);
            }
        });
    }

    //#endregion

    // ------------------------------------------------------------------------------
    // TEMPLATE
    // ------------------------------------------------------------------------------
    render(h: CreateElement) {
        if (this.checks.onError) {
            if (this.showOnErrorMsg) {
                return h(
                    "p",
                    {
                        style: {
                            color: this.checks.onError.color || this.failed,
                            direction: this.checks.onError.direction || "ltr"
                        }
                    },
                    `${this.checks.onError.msg}`
                );
            }
        } else {
            return (
                <div class="x_input_validator">
                    {!this.checks.hideLines && (
                        <div class="x_input_validator__bars">
                            {this.checks.items.map((item, i) => {
                                return <div class="x_input_validator__bars__bar" style={{ backgroundColor: this.getBarColor[i] }}></div>;
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
}

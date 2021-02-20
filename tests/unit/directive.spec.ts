import { IchecksProp, IvalidatorOptions } from "../../src/types";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import plugin from "../../src/index";

describe("directive", () => {
    const validatorTestProp: IchecksProp = {
        items: [
            {
                label: "random test for validation",
                test: /g/
            }
        ]
    };
    it("should install directive globally", () => {
        const validator = jest.fn();
        const localVue = createLocalVue();
        localVue.use(plugin);
        const _localComponent = {
            template: "<div v-validator='checks'></div>",
            data() {
                return {
                    checks: validatorTestProp
                };
            }
        };

        shallowMount(_localComponent, {
            localVue,
            directives: {
                validator
            }
        });
        expect(validator).toHaveBeenCalled();
    });

    it("customize directive name", () => {
        const test = jest.fn();
        const localVue: any = createLocalVue();
        const customConfig: IvalidatorOptions = {
            name: "test"
        };

        localVue.use(plugin, customConfig);
        const _localComponent = {
            template: "<div v-test='checks'></div>",
            data() {
                return {
                    checks: validatorTestProp
                };
            }
        };

        shallowMount(_localComponent, {
            localVue,
            directives: {
                test
            }
        });
        expect(test).toHaveBeenCalled();
    });

    it("should inject input-validator component to the directive element", () => {
        const _localComponent = {
            template: "<div> <input v-validator=checks /></div>",
            data() {
                return {
                    checks: validatorTestProp
                };
            }
        };

        const localVue = createLocalVue();
        localVue.use(plugin);

        const vm = shallowMount(_localComponent, {
            localVue
        });

        /*
            because we are constructing component manually and adding it to the component on the fly, we can't use methods like findComponent, need to check HTML here
        */
        expect(vm.html()).toBe(
            `<div><span style="display: inline-block; width: 100%;"><input style="width: 100%;"><div class="x_input_validator"><div class="x_input_validator__bars"><div class="x_input_validator__bars__bar" style="background-color: rgb(151, 151, 151);"></div></div><div class="x_input_validator__labels"><div class="x_input_validator__labels__label"><div class="x_input_validator__labels__label__check" style="background-color: rgb(151, 151, 151); width: 8px; height: 8px;"></div><p style="color: rgb(151, 151, 151);">random test for validation</p></div></div></div></span></div>`
        );
        expect(vm.find(".x_input_validator").exists()).toBe(true);
    });
});

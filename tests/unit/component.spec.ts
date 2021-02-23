/* eslint-disable */
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import plugin from "../../src/index";

import validator from "../../src/component/input-validator";
import { IchecksProp, IvalidatorOptions } from "@/types";

const utils = require("../utils");

jest.useFakeTimers();

describe("input-validator component (color)", () => {
    test("should render validator component with default colors", () => {
        const Vue = createLocalVue();
        Vue.use(plugin);
        const test: IchecksProp = {
            items: [
                {
                    label: "random test for validation",
                    test: /g/
                }
            ]
        };
        const test1Component = {
            template: "<div><input v-validator='checks' /></div>",
            data() {
                return {
                    checks: test
                };
            }
        };

        const _vm = mount(test1Component, {
            localVue: Vue
        });

        const defaultUncheckedColor = utils.hexToRgb("#979797");

        expect(_vm.find(".x_input_validator__bars__bar").attributes().style).toBe(`background-color: rgb(${defaultUncheckedColor});`);
        expect(_vm.find(".x_input_validator__labels__label__check").attributes().style).toBe(`background-color: rgb(${defaultUncheckedColor}); width: 8px; height: 8px;`);
        expect(_vm.find("p").attributes().style).toBe(`color: rgb(${defaultUncheckedColor});`);
    });

    test("should render validator component with given color", () => {
        const Vue = createLocalVue();

        const options: IvalidatorOptions = {
            unchecked: "#ff9874"
        };

        Vue.use(plugin, options);

        const test: IchecksProp = {
            items: [
                {
                    label: "random test for validation",
                    test: /g/
                }
            ]
        };
        const test1Component = {
            template: "<div><input v-validator='checks' /></div>",
            data() {
                return {
                    checks: test
                };
            }
        };

        const _vm = mount(test1Component, {
            localVue: Vue
        });

        const modifiedColor = utils.hexToRgb(options.unchecked);

        expect(_vm.find(".x_input_validator__bars__bar").attributes().style).toBe(`background-color: rgb(${modifiedColor});`);
        expect(_vm.find(".x_input_validator__labels__label__check").attributes().style).toBe(`background-color: rgb(${modifiedColor}); width: 8px; height: 8px;`);
        expect(_vm.find("p").attributes().style).toBe(`color: rgb(${modifiedColor});`);
    });
});

describe("input-validator component (template)", () => {
    const Vue = createLocalVue();
    Vue.use(plugin);

    test("should render 3 elements (bars, check circles, labels) on the page", () => {
        const test: IchecksProp = {
            items: [
                {
                    label: "test label1",
                    test: /g/
                },
                {
                    label: "test label2",
                    test: /g/
                },
                {
                    label: "test label3",
                    test: /g/
                }
            ]
        };
        const test1Component = {
            template: "<div><input v-validator='checks' /></div>",
            data() {
                return {
                    checks: test
                };
            }
        };

        const _vm = mount(test1Component, {
            localVue: Vue
        });

        expect(_vm.findAll(".x_input_validator__bars__bar").length).toBe(3);
        expect(_vm.findAll(".x_input_validator__labels__label__check").length).toBe(3);
        expect(_vm.findAll("p").length).toBe(3);
    });
});

describe("input-validator component (validation user test suites)", () => {
    const propsData = {
        unchecked: "#000000",
        success: "#000000",
        failed: "#000000",
        watcher: "",
        disable: false,
        debounce: undefined,
        checks: {
            items: [
                {
                    label: "test using regex",
                    test: /g/
                },
                {
                    label: "test using function",
                    test: (val: String) => (+val > 0 ? true : false)
                }
            ]
        }
    };

    const _wrapper = shallowMount(validator, {
        propsData
    });

    test("should throw error if test is not typeof Function Or Regex", () => {
        const randomUserTest = [
            {
                label: "invalid test",
                test: "1"
            }
        ];

        expect(() => {
            _wrapper.vm.validateTest(randomUserTest as any);
        }).toThrow();
    });

    test("should test user input with given tests", async () => {
        const runTestsSpy = jest.spyOn(_wrapper.vm, "runTests");

        await _wrapper.setProps({
            watcher: "random input"
        });

        jest.advanceTimersByTime(1000);

        expect(runTestsSpy).toHaveBeenCalled();
        expect(runTestsSpy).toHaveBeenCalledWith("random input", propsData.checks.items);

        runTestsSpy.mockClear();
    });

    test("should return false if tests fails", async () => {
        const _localWrapper = shallowMount(validator, {
            propsData: {
                watcher: "",
                debounce: undefined,
                checks: {
                    items: [
                        {
                            label: "test using function",
                            test: (val: String) => (+val > 50 ? true : false)
                        },
                        {
                            label: "test using function",
                            test: (val: String) => (+val > 11 ? true : false)
                        }
                    ]
                }
            }
        });

        const validatorSpy = jest.spyOn(_localWrapper.vm.$data.validator, "test");

        await _localWrapper.setProps({
            watcher: "10"
        });

        jest.advanceTimersByTime(1000);

        expect(validatorSpy).toHaveNthReturnedWith(1, false);
        expect(validatorSpy).toHaveNthReturnedWith(2, false);
    });

    test("should return true if test passes", async () => {
        const _localWrapper = shallowMount(validator, {
            propsData: {
                watcher: "",
                debounce: undefined,
                checks: {
                    items: [
                        {
                            label: "test using function",
                            test: (val: String) => (+val > 1 ? true : false)
                        }
                    ]
                }
            }
        });

        const validatorSpy = jest.spyOn(_localWrapper.vm.$data.validator, "test");

        await _localWrapper.setProps({
            watcher: "10"
        });

        jest.advanceTimersByTime(1000);

        expect(validatorSpy).toHaveNthReturnedWith(1, true);
    });

    test("throw error if function test suite doesn't have return statement ", async () => {
        const mockFn = () => {};

        expect(() => {
            _wrapper.vm.functionStrategy(mockFn, "dummy");
        }).toThrow();
    });
});

describe("input-validator component (user options & validation & other...)", () => {
    const callBackMock = jest.fn();
    const propsData = {
        // random dummy colors
        unchecked: "gray",
        success: "green",
        failed: "red",
        watcher: "",

        checks: {
            onSuccess: callBackMock,
            hideLabels: false,
            hideLines: false,
            disable: false,
            debounce: undefined,
            circleSize: 8,
            items: [
                {
                    label: "test using regex",
                    test: /[A-Za-z]/
                },
                {
                    label: "test using function",
                    test: (val: String) => (val === "test" ? true : false)
                }
            ]
        }
    };
    const _wrapper = shallowMount(validator, {
        propsData
    });

    test("label container should not be visible if hideLabels === true", async () => {
        expect(_wrapper.find(".x_input_validator__labels__label").exists()).toBeTruthy();

        propsData.checks.hideLabels = true;
        _wrapper.vm.$forceUpdate();

        await _wrapper.vm.$nextTick();

        expect(_wrapper.find(".x_input_validator__labels__label").exists()).toBeFalsy();
        expect(_wrapper.find(".x_input_validator__labels").exists()).toBeFalsy();
    });

    test("bar(lines) container should not be visible if hideLines === true", async () => {
        propsData.checks.hideLines = true;
        _wrapper.vm.$forceUpdate();

        await _wrapper.vm.$nextTick();

        expect(_wrapper.find(".x_input_validator__bars").exists()).toBeFalsy();

        // reset hideLines to false for other tests
        propsData.checks.hideLines = false;
        await _wrapper.vm.$nextTick();
    });

    test("should set success color for first Bar Div element if its test pass", async () => {
        await _wrapper.setProps({
            watcher: "random"
        });

        await _wrapper.vm.$nextTick();

        jest.advanceTimersByTime(1000);

        await _wrapper.vm.$nextTick();

        expect(
            _wrapper
                .findAll(".x_input_validator__bars__bar")
                .at(0)
                .attributes().style
        ).toBe(`background-color: ${propsData.success};`);
    });

    test("should set success color for first Bar Div element and its label if the test pass", async () => {
        await _wrapper.setProps({
            watcher: "test"
        });
        jest.advanceTimersByTime(1000);

        propsData.checks.hideLabels = false;
        _wrapper.vm.$forceUpdate();

        await _wrapper.vm.$nextTick();

        // second test pass
        expect(
            _wrapper
                .findAll(".x_input_validator__bars__bar")
                .at(0)
                .attributes().style
        ).toBe(`background-color: ${propsData.success};`);

        expect(
            _wrapper
                .findAll(".x_input_validator__labels__label__check")
                .at(1)
                .attributes().style
        ).toBe(`background-color: ${propsData.success}; width: 8px; height: 8px;`);

        expect(
            _wrapper
                .findAll("p")
                .at(1)
                .attributes().style
        ).toBe(`color: ${propsData.success};`);
    });

    test("if all tests pass, should call callback", async () => {
        await _wrapper.setProps({
            watcher: "test"
        });

        jest.advanceTimersByTime(1000);

        await _wrapper.vm.$nextTick();

        expect(callBackMock).toHaveBeenCalledTimes(1);
    });

    test("circles should render with given size", async () => {
        propsData.checks.circleSize = 20;
        _wrapper.vm.$forceUpdate();

        await _wrapper.vm.$nextTick();

        jest.advanceTimersByTime(1000);

        // color is green because of other tests
        expect(_wrapper.find(".x_input_validator__labels__label__check").attributes().style).toBe(`background-color: ${propsData.success}; width: 20px; height: 20px;`);
    });

    test("should not call tests if component is disabled", async () => {
        const runTestSpy = jest.spyOn(_wrapper.vm, "runTests");

        propsData.checks.disable = true;
        _wrapper.vm.$forceUpdate();
        await _wrapper.setProps({
            watcher: "dummy text"
        });

        jest.advanceTimersByTime(1000);

        expect(runTestSpy).not.toHaveBeenCalled();
    });
});

describe("async and debounce", () => {
    const propsData = {
        // random dummy colors
        unchecked: "gray",
        success: "green",
        failed: "red",
        watcher: "",

        checks: {
            debounce: undefined,
            circleSize: 8,
            items: [
                {
                    label: "test using regex",
                    test: /[A-Za-z]/
                },
                {
                    label: "test using function",
                    test: (val: String) => (val === "test" ? true : false)
                }
            ]
        }
    };

    const _wrapper = shallowMount(validator, {
        propsData
    });

    test("debounce should delay test validation process", async () => {
        propsData.checks.debounce = 1000 as any;
        _wrapper.vm.$forceUpdate();
        await _wrapper.setProps({
            watcher: "test"
        });

        jest.advanceTimersByTime(500);

        await _wrapper.vm.$nextTick();

        expect(
            _wrapper
                .findAll(".x_input_validator__bars__bar")
                .at(0)
                .attributes().style
        ).toBe(`background-color: ${propsData.unchecked};`);

        jest.advanceTimersByTime(5000);

        await _wrapper.vm.$nextTick();

        expect(
            _wrapper
                .findAll(".x_input_validator__bars__bar")
                .at(0)
                .attributes().style
        ).toBe(`background-color: ${propsData.success};`);

        propsData.checks.debounce = 0 as any;
    });
});

describe("onError", () => {
    const propsData = {
        // random dummy colors
        unchecked: "gray",
        success: "green",
        failed: "red",
        watcher: "",

        checks: {
            items: [
                {
                    label: "test using regex",
                    test: /[A-Za-z]/
                }
            ],
            onError: {
                msg: "test error msg"
            }
        }
    };

    const _wrapper = shallowMount(validator, {
        propsData
    });
    test("if user provide onError  set .x_input_validator to false", () => {
        expect(_wrapper.find(".x_input_validator").exists()).toBeFalsy();
        expect(_wrapper.find("p").exists()).toBeTruthy();
    });

    test("should render error message with given text", () => {
        expect(_wrapper.find("p").text()).toBe("test error msg");
    });

    test("if user don't provide color for onError, render with defaul color", () => {
        expect(_wrapper.find("p").attributes().style).toBe(`color: ${propsData.failed};`);
    });

    test("if user provide color for onError, render with given color", async () => {
        (propsData.checks.onError as any).color = "yellow"; // dummy color
        _wrapper.vm.$forceUpdate();
        await _wrapper.vm.$nextTick();
        expect(_wrapper.find("p").attributes().style).toBe("color: yellow;");
    });
});

/*



*/

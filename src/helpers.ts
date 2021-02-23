import Vue from "vue";
import { VueConstructor } from "vue/types/umd";
import { DomManipulation, IreactiveProps, IvalidatorPrototypeDefinition } from "./types";
import { createObjectFromArray, getFailedValidationByKeys } from "./utils";
import Bus from "./validatorBus";

export const replaceElement: DomManipulation = (oldNode, newNode): void => {
    oldNode.parentNode?.replaceChild(newNode, oldNode);
};

export const createValidatorContainer = (boundElement: HTMLElement, validatorElement: Element): HTMLSpanElement => {
    const _spanContainer = document.createElement("span");

    // Set styles for span Container
    _spanContainer.style.display = "inline-block";
    _spanContainer.style.width = "100%";

    boundElement.style.width = "100%";

    replaceElement(boundElement, _spanContainer);

    _spanContainer.appendChild(boundElement);
    _spanContainer.appendChild(validatorElement);

    return _spanContainer;
};

export const injectReactiveProps = (component: Function, data: IreactiveProps) => {
    return new Vue({
        data() {
            return data;
        },
        render(h) {
            return h(component, { props: this.$data });
        }
    });
};

export const setPrototype = (Vue: VueConstructor): void => {
    const bus = new Bus();
    const prototypeMethods: IvalidatorPrototypeDefinition = {
        isValid(key: string): boolean {
            return bus.request("validationStatus", key);
        },

        showError(key?: string): void {
            bus.request("setErrors", key);
        },

        validate(...keys: string[]) {
            const promises: Array<Promise<boolean>> = [];
            keys.forEach(key => {
                promises.push(bus.request("validate", key));
            });

            return Promise.all(promises)
                .then(results => {
                    const validationsResult = createObjectFromArray(keys, results);
                    const failedValidations = getFailedValidationByKeys(validationsResult);

                    failedValidations.forEach(key => {
                        bus.request("setOnErrors", key);
                    });

                    return validationsResult;
                })
                .catch(e => {
                    throw new Error(e);
                });
        }
    };
    Vue.prototype.$validator = prototypeMethods;
};

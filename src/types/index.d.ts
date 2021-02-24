import { PluginFunction } from "vue";
import validatorDefinition from "./validatorDefinitions";
import validator from "./plugin";

declare global {
    interface Window {
        Vue?: VueConstructor<Vue>;
    }
}

export interface IvalidatorOptions {
    name?: string;
    success?: string;
    unchecked?: string;
    failed?: string;
}

export interface IchecksProp {
    onSuccess?: Function;
    key?: string;
    hideLines?: boolean;
    hideLabels?: boolean;
    circleSize?: number;
    disable?: boolean;
    debounce?: number;
    items: checkPropertyItemsType;
    onError?: IonError;
}

export interface IonError {
    msg: string;
    color?: string;
    highlight?: boolean;
    direction?: "rtl" | "ltr";
}

export interface IvalidatorStrategy {
    strategy: Function | null;
    set: (fn: Function) => void;
    test: (args: string) => void;
}

export interface IreactiveProps extends IvalidatorOptions {
    watcher: string;
    checks: IchecksProp;
    el: HTMLElement;
}

export interface IsubscribersObjectType {
    key: string;
    handler: Function;
}
export type eventSubscribersItemList = Array<IsubscribersObjectType>;
export interface IeventSubscribers {
    [index: string]: eventSubscribersItemList;
}

export interface IvalidatorPrototypeDefinition {
    /**
     * @description Checks if the validation is done or not
     * @param {string} key
     * @returns {boolean} Boolean true | false
     */
    isValid(key: string): boolean;

    /**
     * @description Changes all validations that have not been validated to red
     * @param {string} key
     * @returns {void}
     */
    showError(key?: string): void;

    /**
     * @description Allow user to validate on click and events
     * @param {string} key
     * @returns {boolean}
     */
    validate(...key: any): Promise<{ [index: string]: boolean }> | never;
}

import Vue, { PluginFunction, VueConstructor } from "vue";

declare const validator: VueConstructor<vue> & { install: PluginFunction<IvalidatorOptions> };
export default validator;

export type DomManipulation = (oldNode: HTMLElement, newNode: HTMLElement) => void;
export type VueRefs = HTMLElement | HTMLElement[] | Vue | Element | Vue[] | Element[];
export type checkPropertyItemsType = Array<{ label: string; test: functionOrRegex }>;
export type functionOrRegex = RegExp | Function;
export type eventType = "validationStatus" | "setErrors" | "setOnErrors" | "validate";

export default validatorDefinition;
export default validator;

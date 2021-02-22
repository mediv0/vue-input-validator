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
    hide?: boolean;
    circleSize?: number;
    disable?: boolean;
    items: checkPropertyItemsType;
}

export interface IvalidatorStrategy {
    strategy: Function | null;
    set: (fn: Function) => void;
    test: (args: string) => void;
}

export interface IreactiveProps extends IvalidatorOptions {
    watcher: string;
    checks: IchecksProp;
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
}

import Vue, { PluginFunction, VueConstructor } from "vue";

declare const validator: VueConstructor<vue> & { install: PluginFunction<IvalidatorOptions> };
export default validator;

export type DomManipulation = (oldNode: HTMLElement, newNode: HTMLElement) => void;
export type VueRefs = HTMLElement | HTMLElement[] | Vue | Element | Vue[] | Element[];
export type checkPropertyItemsType = Array<{ label: string; test: functionOrRegex }>;
export type functionOrRegex = RegExp | Function;
export type eventType = "validationStatus" | "setErrors";

export default validatorDefinition;
export default validator;

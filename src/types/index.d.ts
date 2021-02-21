import { PluginFunction } from "vue";
import * as validatorDefinition from "./validatorDefinitions";

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

export interface IvalidatorPrototypeDefinition {
    /**
     * @description Checks if the validation is done or not
     * @returns {boolean} Boolean true | false
     */
    isValid(): boolean;

    /**
     * @description Changes all validations that have not been validated to red
     * @returns {void}
     */
    showError(): void;
}

declare function install(Vue: VueConstructor<Vue>, options?: IvalidatorOptions): void;
declare const _default: {
    install: typeof install;
};

export type DomManipulation = (oldNode: HTMLElement, newNode: HTMLElement) => void;
export type VueRefs = HTMLElement | HTMLElement[] | Vue | Element | Vue[] | Element[];
export type checkPropertyItemsType = Array<{ label: string; test: functionOrRegex }>;
export type functionOrRegex = RegExp | Function;
export default validatorDefinition;
export default _default;

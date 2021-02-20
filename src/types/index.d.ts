import * as validatorDefinition from "./validatorDefinitions";
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

export type DomManipulation = (oldNode: HTMLElement, newNode: HTMLElement) => void;
export type VueRefs = HTMLElement | HTMLElement[] | Vue | Element | Vue[] | Element[];
export type checkPropertyItemsType = Array<{ label: string; test: functionOrRegex }>;
export type functionOrRegex = RegExp | Function;

import component from "./component/index";

import { VueConstructor } from "vue";
import { createValidatorContainer, injectReactiveProps } from "./helpers";
import { IchecksProp, IvalidatorOptions, IreactiveProps } from "./types";

const injectDirective = (Vue: VueConstructor, options: IvalidatorOptions) => {
    Vue.directive(options.name as string, {
        inserted(el: HTMLElement, { value }) {
            const _value = value as IchecksProp;

            const _props: IreactiveProps = {
                // saving a refrence to the user options
                checks: _value,
                ...options,
                watcher: "",
                el: el
            };

            const _constructor = injectReactiveProps(component, _props);
            const _component = _constructor.$mount();
            createValidatorContainer(el, _component.$el);

            // ------------------------------------------------------------------------------
            // WATCH USER INPUT
            // ------------------------------------------------------------------------------
            el.addEventListener("keyup", () => {
                _props.watcher = (el as HTMLInputElement).value;
            });
        }
    });
};

export default injectDirective;

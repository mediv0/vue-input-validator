import { VueConstructor } from "vue";
import injectDirective from "./injectDirective";
import { IvalidatorOptions } from "./types";

// ------------------------------------------------------------------------------
// DEFAULT OPTIONS
// ------------------------------------------------------------------------------
const __validatorOptions__: IvalidatorOptions = {
    name: "validator",
    success: "#2DE68F",
    failed: "#FF4343",
    unchecked: "#979797"
};

const install = (context: VueConstructor, userOptions: IvalidatorOptions) => {
    const _options = {
        ...__validatorOptions__,
        ...userOptions
    };
    injectDirective(context, _options);
};

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue, __validatorOptions__);
}

export default install;

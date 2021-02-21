import Vue, { PluginFunction, VueConstructor } from "vue";

declare const validator: VueConstructor<vue> & { install: PluginFunction<IvalidatorOptions> };
export default validator;

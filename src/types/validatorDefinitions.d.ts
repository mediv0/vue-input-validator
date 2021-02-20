import Vue from "vue";
import { IvalidatorPrototypeDefinition } from ".";

export declare module "vue/types/vue" {
    interface Vue {
        $validator: IvalidatorPrototypeDefinition;
    }

    interface VueConstructor {
        $validator: IvalidatorPrototypeDefinition;
    }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        $validator?: IvalidatorPrototypeDefinition;
    }
}

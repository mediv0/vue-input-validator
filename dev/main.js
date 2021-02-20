import Vue from "vue";
import App from "./App.vue";

import validator from "../src/index";

Vue.config.productionTip = false;

Vue.use(validator);

new Vue({
    render: h => h(App)
}).$mount("#app");

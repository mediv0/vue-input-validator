<template>
    <div id="App">
        <input v-validator="props" />
    </div>
</template>

<script lang="ts">
import { IchecksProp } from "@/types";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
    public props: IchecksProp = {
        items: [
            {
                label: "test1",
                test: /1/
            },
            {
                label: "test1",
                test: /1/
            },
            {
                label: "test1",
                test: /1/
            }
        ]
    };

    public test(): void {
        this.$validator.showError();
    }
}
</script>

<style lang="scss" scoped></style>

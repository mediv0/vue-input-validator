<template>
    <div id="App">
        <h1 v-validator>dev component</h1>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style lang="scss" scoped></style>

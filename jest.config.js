module.exports = {
    preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
    coverageDirectory: "coverage",
    collectCoverageFrom: ["./src/**/*.ts", "./src/**/*.tsx", "!./src/index.js", "!./src/index.ts", "!./src/component/index.ts"],
    collectCoverage: true
};

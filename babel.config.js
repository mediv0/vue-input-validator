module.exports = {
    presets: ["@vue/cli-plugin-babel/preset", "@babel/preset-typescript", "@vue/babel-preset-jsx"],
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
    ]
};

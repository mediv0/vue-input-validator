const dev = {
    presets: ["@vue/cli-plugin-babel/preset"]
};
const prod = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    esmodules: true
                }
            }
        ],
        "@babel/preset-typescript",
        "@vue/babel-preset-jsx"
    ],
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
    ]
};

// NODE_ENV test for jest
module.exports = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test" ? dev : prod;

/* eslint-disable */

const fs = require("fs-extra");
const chalk = require("chalk");
const execa = require("execa");
const { gzipSync } = require("zlib");
const { compress } = require("brotli");
const createUnicorn = require("./preInstall");
const copyTypes = require("./postInstall");

const files = ["dist/validator.esm-browser.js", "dist/validator.esm-browser.prod.js", "dist/validator.esm-bundler.js", "dist/validator.global.js", "dist/validator.global.prod.js", "dist/validator.cjs.js"];

async function run() {
    await createUnicorn();
    await build();
    await copyTypes();
    checkAllSizes();
}

async function build() {
    await execa("rollup", ["-c", "./build/rollup.config.js"], { stdio: "inherit" });
}

function checkAllSizes() {
    console.log();
    files.map(f => checkSize(f));
    console.log();
}

function checkSize(file) {
    const f = fs.readFileSync(file);
    const minSize = (f.length / 1024).toFixed(2) + "kb";
    const gzipped = gzipSync(f);
    const gzippedSize = (gzipped.length / 1024).toFixed(2) + "kb";
    const compressed = compress(f);
    const compressedSize = (compressed.length / 1024).toFixed(2) + "kb";
    console.log(`${chalk.gray(chalk.bold(file))} size:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`);
}

run();
/* eslint-disable */

const chalk = require("chalk");


async function createUnicorn() {
    const unicorn = [
        chalk.red("                              /"),
        chalk.redBright("                   __        //"),
        chalk.redBright("                   -= =   //"),
        chalk.yellow("                 --=_=---//=--"),
        chalk.yellow("               -_==/  / ///--"),
        chalk.yellow("                ==/   /O   O==--"),
        chalk.yellowBright("   _ _ _ _     /_/      ]  /--"),
        chalk.blue("  / ( (-     /         ] ] ]==-"),
        chalk.blue(" ( ___-__/             (,_,)--"),
        chalk.blue("(_/                      -"),
        chalk.blueBright("/      /       (   (   ] /)"),
        chalk.blueBright("/      (            _ ./ )"),
        chalk.green("(                      )  \\"),
        chalk.green("(       /_ _ _ _ /---/ /_  \\"),
        chalk.greenBright("     /      / ____/ /     \\"),
        chalk.cyan("  (   /   )   / /  /__ )   (  )                          // generating packages...."),
        chalk.cyan("  (  )   / __/ '---`       / /                           // <www.mahdi.wtf>"),
        chalk.cyanBright("    /                 _/ /                               // <github.com/mediv0>"),
        chalk.yellow("  ] ]     )__         /__/"),
        chalk.red("  /_     ]___\\"),
        chalk.blue(" (___)")
    ];

    unicorn.forEach(line => {
        console.log(line);
    });

    console.log();
    console.log("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ");
}

module.exports = createUnicorn;
/* eslint-disable */

import { IchecksProp } from "../src/types/index";

const options: IchecksProp = {
    key: "key for this object",

    items: [
        {
            label: "your first test with regex",
            test: /[0-9]/
        },
        {
            label: "second test  sync function",
            test: inputValue => {}
        },
        {
            label: "third test with async function",
            test: async () => {}
        }
    ],

    debounce: 200, // postponed your validation

    circleSize: 10, // size of circles in px

    hideLabels: true, // hide labels under your input

    hideLines: true, // hide lines under your input

    disable: true, // disable your input

    onSuccess: () => {}, // callback when validation passes

    onError: {
        msg: "your error msg",
        color: "error color if you want it",
        direction: "ltr", // direction of error,
        highlight: true // highlight error border if set to true
    }
};

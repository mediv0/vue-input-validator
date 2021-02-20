import { replaceElement, createValidatorContainer } from "../../src/helpers";

describe("helpers", () => {
    // fake elements
    const fakeDiv = document.createElement("div");
    const fakeSpan = document.createElement("span");

    // container for insterted element
    const fakeParent = document.createElement("div");
    fakeParent.appendChild(fakeDiv);

    it("replaceElement should replace oldNode with newNode", () => {
        replaceElement(fakeDiv, fakeSpan);
        expect(fakeParent.children[0]).toEqual(fakeSpan);
    });

    it("createValidatorContainer should create a span container for given elements", () => {
        const _el = createValidatorContainer(fakeDiv, fakeSpan);
        expect(_el.toString()).toBe("[object HTMLSpanElement]");
        expect(_el.children[0]).toEqual(fakeDiv);
        expect(_el.children[1]).toEqual(fakeSpan);
    });
});

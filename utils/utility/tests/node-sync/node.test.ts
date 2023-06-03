import { resolve } from "path";

import { node } from "../../node-sync";

describe("node", () => {
  it("node-sync.js should run successfully.", () => {
    expect(node(resolve(__dirname, "./node-sync"))).toBe("Hello, world!");
  });

  it("node-async.js should run successfully.", () => {
    expect(node(resolve(__dirname, "./node-async"))).toBe("Hello, world!");
  });

  it("node-error.js should throw Error.", () => {
    expect(() => node(resolve(__dirname, "./node-error"))).toThrowError(
      /SyntaxError: Identifier 'a' has already been declared/
    );
  });
});

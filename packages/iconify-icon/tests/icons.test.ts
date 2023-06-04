import icons from "../src/icon-names";

describe("icons", () => {
  it("should collect icon names", () => {
    const values = icons("./tests/icons");
    expect(values).toContain("dummy/icon");
  });
});

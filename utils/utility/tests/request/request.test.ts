import { get } from "../../request";

describe("request", () => {
  it("should response successfully.", async () => {
    const res = await get("https://api.publicapis.org/health");
    expect(res).toEqual({ alive: true });
  });

  it("should throw Error.", async () => {
    await expect(
      async () => await get("https://api.publicapis.org/404")
    ).rejects.toThrowError(/404/);
  });
});

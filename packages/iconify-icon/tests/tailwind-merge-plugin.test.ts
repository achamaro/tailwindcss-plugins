import { extendTailwindMerge } from "tailwind-merge";

import twMergeIconifyIcon from "../src/tailwind-merge-plugin";

const twMerge = extendTailwindMerge(twMergeIconifyIcon());

describe("tailwind-merge-plugin", () => {
  it("should be merged", () => {
    expect(twMerge("i-[dummy:icon1] i-[dummy:icon2]")).toBe("i-[dummy:icon2]");

    expect(twMerge("i-[dummy:icon1] hover:i-[dummy:icon2]")).toBe(
      "i-[dummy:icon1] hover:i-[dummy:icon2]"
    );
  });

  expect(
    twMerge(
      "i-[dummy:icon1] i-[dummy:icon2] hover:i-[dummy:icon3] hover:i-[dummy:icon4]"
    )
  ).toBe("i-[dummy:icon2] hover:i-[dummy:icon4]");
});

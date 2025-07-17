import { describe, it } from "node:test";

// Function to test
function addition(a: number, b: number) {
  return a + b;
}

describe("addition function test", () => {
  it("should return 5 for addition (2, 3)", () => {
    if (addition(2, 3) !== 5) {
      throw new Error("The sum of 2 and 3 should be 5");
    }
  });
});

import { describe, expect, it } from "vitest";
import { newHomyo } from "./homyo";

describe("newHomyo", () => {
  it("should create a new homyo", () => {
    // Arrange
    const props = { id: 1, name: "homyo" };

    // Act
    const homyo = newHomyo(props);

    // Assert
    expect(homyo).toEqual(props);
  });
});

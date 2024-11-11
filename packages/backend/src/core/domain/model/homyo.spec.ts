import { describe, expect, it } from "vitest";
import { Homyo } from "./homyo";
import { newModelId } from "./id";

const modelId = newModelId();

describe("Homyo.new", () => {
  it("should create a new homyo", () => {
    // Arrange
    const props = {
      id: modelId,
      name: "homyo",
    };

    // Act
    const homyo = Homyo.new(props);

    // Assert
    expect(homyo).toEqual(props);
  });
});

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

describe("validateHomyoLength", () => {
  it("should return null if the name is 2 characters length", () => {
    // Act
    const result = Homyo.validateHomyoLength("光明");

    // Assert
    expect(result).toBeNull();
  });

  it("should return an error if the name is not 2 characters length", () => {
    // Act
    const result = Homyo.validateHomyoLength("");

    // Assert
    expect(result).toBeInstanceOf(Error);
  });
});

import { describe, expect, it } from "vitest";
import { Homyo } from "./homyo";

describe("Homyo.new", () => {
  it("should create a new homyo", () => {
    // Arrange
    const props = { id: 1, name: "homyo" };

    // Act
    const homyo = Homyo.new(props);

    // Assert
    expect(homyo).toEqual(props);
  });

  it("should throw an error if id is not positive", () => {
    // Arrange
    const props = { id: 0, name: "homyo" };

    // Act
    const act = () => Homyo.new(props);

    // Assert
    expect(act).toThrowError();
  });

  it("should throw an error if id is not int", () => {
    // Arrange
    const props = { id: 1.1, name: "homyo" };

    // Act
    const act = () => Homyo.new(props);

    // Assert
    expect(act).toThrowError();
  });

  it("should throw an error if name is empty", () => {
    // Arrange
    const props = { id: 1, name: "" };

    // Act
    const act = () => Homyo.new(props);

    // Assert
    expect(act).toThrowError();
  });

  it("should throw an error if name is too long", () => {
    // Arrange
    const props = { id: 1, name: "a".repeat(256) };

    // Act
    const act = () => Homyo.new(props);

    // Assert
    expect(act).toThrowError();
  });

  // it("should occur type error if value is not branded", () => {
  //   const v: Homyo = { id: 1, name: "a" };
  // });
});

export class InvalidParameterError extends Error {
  constructor(message: string) {
    super("Invalid parameter: " + message);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super("Not found: " + message);
  }
}

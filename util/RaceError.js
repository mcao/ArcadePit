class RaceError extends Error {
  constructor(message = "", ...args) {
    super(message, ...args);
    this.message = 'RaceError: ' + message;
  }
}
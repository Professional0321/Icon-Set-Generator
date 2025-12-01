module.exports = function MockReplicate() {
  return {
    run: jest.fn().mockResolvedValue(["https://example.com/icon.png"])
  };
};

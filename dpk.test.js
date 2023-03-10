const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return hex string of the event object when no partitionKey field is not provided", () => {
    const event = {};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex"));
  });

  it("Returns the partitionKey if partitionKey is string and lengh is shorter than or equal to 256", () => {
    const event = {
      partitionKey: "test-key"
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns the hash string of patiticionKey if partitionKey is string and lengh is greate then 256", () => {
    const event = {
      partitionKey: new Array(257).fill('0').join(''),
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(event.partitionKey).digest("hex"));
  });

  it("should apply JSON.stringify first to the partitionKey if partitionKey is not string ", () => {
    const event = {
      partitionKey: {}
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(JSON.stringify(event.partitionKey));
  });

  it("should apply JSON.stringify first to the partitionKey and then apply encryption if partitionKey is not string and it's stringified string is longer than 256 characters", () => {
    const event = {
      partitionKey: { val: new Array(257).fill('0').join('') },
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(event.partitionKey)).digest("hex"));
  });

});

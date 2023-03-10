const crypto = require("crypto");

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };


exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  /**
   * if no event is provided, it simply need to return default TRIVIAL_PARTITION_KEY.
   */
  if(!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const { partitionKey } = event;
  /**
   * if partitionKey is not provided, it simply encrypt the event object and return it as partition key.
   */
  if(!partitionKey) {
    return crypto.createHash("sha3-512").update( JSON.stringify(event)).digest("hex");
  }

  /**
   * if partition key is not string, it should apply JSON.stringify.
   */
  const candidate = typeof partitionKey === "string" ? partitionKey : JSON.stringify(partitionKey);
  /**
   * if candidate is longer than max length, then apply encrypt function and return 128-length string.
   */
  return candidate.length > MAX_PARTITION_KEY_LENGTH ? crypto.createHash("sha3-512").update(candidate).digest("hex") : candidate
};
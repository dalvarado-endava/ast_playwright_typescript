const crypto = require("crypto");

export async function getRandomEmail() {
  return `${crypto.randomBytes(5).toString("hex")}@test.com`;
}

const crypto = require('crypto');

// Num iterations
const number = 4;

// Illustrate thread pool usage & saturation
for (let n = 0; n < number; n++) {

  const iv = getRandom();
  const key = getRandom();
  const text = getRandom(16);
  console.time(`crypto [${n}]`);

  const data = crypto.pbkdf2Sync(iv, key, 500000, 512, 'sha512');
  console.timeEnd(`crypto [${n}]`);
}

function getRandom(length = 8) {
  return (Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7)).substr(0, length)
}


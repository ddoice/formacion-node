const crypto = require('crypto');

// Num iterations
const number = 6;

// This should run on the event loop
setInterval(()=>{
  console.log('Interval')
}, 500)


// Illustrate thread pool usage & saturation
for (let n = 0; n < number; n++) {

  const iv = getRandom();
  const key = getRandom();
  const text = getRandom(16);

  console.time(`crypto [${n}]`);

  crypto.pbkdf2(iv, key, 500000, 512, 'sha512', (data) => {
    console.timeEnd(`crypto [${n}]`);
   })

}

function getRandom (length = 8) {
  return (Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7)).substr(0, length)
}




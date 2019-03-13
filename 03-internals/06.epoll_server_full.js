const express = require('express')
const crypto = require('crypto');
const app = express()
const port = 8081

app.get('/', (req, res) => res.send('It works!'))

app.listen(port, () => console.log(`Express listening on port ${port}!`))

// This should run on the event loop
setInterval(()=>{
  console.log('Interval')
}, 500)

// Num iterations
const number = 50;

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

console.log('ready >>>')

function getRandom (length = 8) {
  return (Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7)).substr(0, length)
}


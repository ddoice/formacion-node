const express = require('express')
const app = express()
const port = 8081

app.get('/', (req, res) => res.send('It works!'))

// Order matters! next() it's a must!
app.use(async (req, res, next) => {
  req.on('end', () => {
    console.log({ ...req, ...res })
  });
  next();
});

app.get('/user/:name?', (req, res) => {
  const { name } = req.params;
  if (name) {
    res.send(`Hi ${name}`);
  } else {
    res.send(`No username received.`);
  }
})


app.listen(port, () => console.log(`Express listening on port ${port}!`))
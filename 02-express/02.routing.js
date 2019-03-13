const express = require('express')
const app = express()
const port = 8081

app.get('/', (req, res) => res.send('It works!'))

app.get('/user/:name?', (req, res) => {
  const { name } = req.params;
  if(name) {
    res.send(`Hi ${name}`);
  } else {
    res.send(`No username received.`);
  }
})

app.listen(port, () => console.log(`Express listening on port ${port}!`))
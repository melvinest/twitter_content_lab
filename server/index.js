const express = require('express');
const cors = require('cors');
const path = require('path');
const client = require('./helpers/twitter');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '/../public')));


app.get('/search/tweets', (req, res) => {
  // used a library called twitter node.js url = https://www.npmjs.com/package/twitter
  client.get('search/tweets', req.query)
    .then((data) => {
      res.send(data)
    });
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`listening to port ${process.env.PORT || 9000}`);
});
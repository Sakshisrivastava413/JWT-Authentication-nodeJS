const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', function (req, res) {
  res.json({
    message: "welcome to the api"
  });
});

app.post('/api/post', function (req, res) {
  res.json({
    message: "Post created ..."
  });
});

app.post('/api/login', function (req, res) {

  const user = {
    id: 1,
    username: "sakshi",
    email: "sakshi@jwt.com"
  }

  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({
      token
    });
  });
});



app.listen(process.env.port || 5000,
  () => { console.log("server started on port 5000") })
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', function (req, res) {
  res.json({
    message: "welcome to the api"
  });
});

app.post('/api/post', verifyToken, function (req, res) {
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

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader != 'undefined') {

  } else {
    res.sendStatus(403);
  }
}

app.listen(process.env.port || 5000,
  () => { console.log("server started on port 5000") })
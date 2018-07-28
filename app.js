const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', function (req, res) {
  res.json({
    message: "welcome to the api"
  });
});

app.post('/api/post', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created ...",
        authData
      });
    }
  })
});

app.post('/api/login', function (req, res) {

  const user = {
    id: 1,
    username: "sakshi",
    email: "sakshi@jwt.com"
  }

  jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
  // get auth header value
  const bearerHeader = req.headers['authorization'];
  // check if bearer is undefined
  if (typeof bearerHeader != 'undefined') {
    // split at the space
    const bearer = bearerHeader.split(' ');
    // get token from array
    const bearerToken = bearer[1];
    // set the token
    req.token = bearerToken
    // next the middleware
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
}

app.listen(process.env.port || 5000,
  () => { console.log("server started on port 5000") })
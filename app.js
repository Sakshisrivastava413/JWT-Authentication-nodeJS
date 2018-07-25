const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/', function (req, res) {
  res.json({
    message: "welcome to the api"
  });
});

app.listen(process.env.port || 5000,
  () => { console.log("server started on port 5000") })
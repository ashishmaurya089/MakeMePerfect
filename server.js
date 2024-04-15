// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://ashishmaurya089:xfKoJNflZ1RUjEAa@instagramdata.mxzdq3v.mongodb.net/InstagramDatas', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Create user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('users', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Handle login POST request
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password match
  User.findOne({ username, password }, (err, user) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (user) {
      res.send('Login successful');
    } else {
      res.send('Invalid username or password');
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${5500}`);
});

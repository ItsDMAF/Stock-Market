const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const jwtStrategy = require("./Security/jwtStrategy");
const WebsocketConnector = require("./Websocket/connector")
const startGateway = require('./Websocket/gateway');
const http = require('http');
const cors = require('cors');

dotenv.config();
const server = http.createServer(app);

const port = process.env._PORT || 8080;

const registerRoute = require('./Routes/register');
const loginRoute = require('./Routes/login');

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use('/api/auth/register', registerRoute);
app.use('/api/auth/login', loginRoute);

app.get('/api/user/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

mongoose.connect(process.env.Mongo_URL)
  .then(() => {
    console.log("DB connect successfully");
  })
  .catch(err => console.error("MongoDB connection error:", err));

  server.listen(port, () => {
      console.log(`app running on port ${port}`);
    });
startGateway(server);
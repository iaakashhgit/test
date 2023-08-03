const express = require('express');
const app = express();
const port = 3000;
const raftLabsRoutes = require('./routes/raftLabs');
const authRoutes = require('./routes/auth-routes')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

// Import the JWT middleware
const authenticateToken = require('./auth/checkToken');

const MONGODB_URL = process.env.DB_URL

app.use(bodyParser.json());
app.use("/auth",authRoutes); // Apply JWT middleware to the "/Raft-Labs" routes
app.use("/Raft-Labs", authenticateToken,raftLabsRoutes); // Apply JWT middleware to the "/Raft-Labs" routes

// Socket.IO Middleware to authenticate WebSocket connections
wss.on('connection', function connection(ws) {
  console.log("client connected")

  ws.on('open', (data) => {
  })

  
  ws.on('message', function incoming(data) {
    console.log("incoming data:",data.toString())
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

// Start the server and listen on port 3000
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: false, driverInfo: { platform: 'Raft-Labs' }})
  .then(() => {
    server.listen(`${port}`, () => {
      console.log('Server started at  ',port);
     });
  })
  .catch((err) => console.log(err));

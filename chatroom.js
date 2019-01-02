'use strict';

// First Party Modules
const net = require('net');

// Esoteric Libraries 
const events = require('./lib/events.js');
const socketPool = require('./lib/socket-pool.js');
const User = require('./models/users.js');

const actions = require('require-directory')(module, './actions');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.on('connection', (socket) => {
  let user = new User(socket);
  socketPool[user.id] = user;
  socket.on('data', (buffer) => dispatchAction(user.id, buffer));
});

let parse = (buffer) => {
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let [target,message] = payload.split(/\s+(.*)/);
  return {command,payload,target,message};
};

let dispatchAction = (userId, buffer) => {
  let entry = parse(buffer);
  events.emit(entry.command, entry, userId);
};

server.listen(port, () => {
  console.log(`Chat Server up on ${port}`);
});

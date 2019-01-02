'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const logger = require('./logger.js');

const commands = {};

commands['@all'] =  (data, userId, socketPool) => {
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
};

commands['@nick'] =  (data, userId, socketPool) => {
  socketPool[userId].nickname = data.target;
};

module.exports = {commands};
'use strict';

const events = require('../lib/events.js');

events.on('@hello', sayHello);

function sayHello(data, userId) {
  data.payload = 'Hello ' + data.payload;
  events.emit('@all', data, userId);
}

module.exports = sayHello;
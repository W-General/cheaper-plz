/*global chrome:false*/
'use strict';

var commands = {};

chrome.extension.onMessage.addListener(function(
  request,
  sender,
  sendResponse) {

  var command = request.command;
  var payload = request.payload;

  if (commands[command]) {
    commands[command](payload, sendResponse);
  }

});

commands.scrape = function (pl, cb) {
  var item;
  try {
    item = {
      price: document.getElementsByClassName('priceLarge')[0].innerText,
      name: 'robot'
    };
  } catch (e) {}
  if (item) {
    chrome.extension.sendMessage({
      command: 'addItem',
      payload: item
    });
  }
};

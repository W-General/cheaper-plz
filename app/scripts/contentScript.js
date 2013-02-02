/*global chrome:false, getDefinition:false*/
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
    // determine site; currently ebay||amazon
    item = getDefinition(document);
  } catch (e) {}
  if (item) {
    item.url = document.location.toString();
    chrome.extension.sendMessage({
      command: 'addItem',
      payload: item
    });
  }
};

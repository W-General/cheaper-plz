var commands = {};

// route 
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

//In background.js:
// React when a browser action's icon is clicked.
/*
chrome.browserAction.onClicked.addListener(function(tab) {

});
*/

var store = [];

commands.addItem = function (item) {
  store.push(item);
};

commands.getItems = function (pl, cb) {
  cb(store);
};

// API available to extension contexts
window.cheapBackground = {
  store: store
};

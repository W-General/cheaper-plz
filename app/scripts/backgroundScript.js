var commands = {};

// route 
chrome.extension.onMessage.addListener(function(
  request,
  sender,
  sendResponse) {
  var command = request.command;
  var payload = request.payload;
  var senderId = sender.tab.id;


  if (commands[command]) {
      commands[command](payload, sendResponse, senderId);
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


commands.refreshIcon = function (pl, cb, senderId){
  chrome.browserAction.setIcon({path: "icon-16-alt.png", tabId: senderId});
}
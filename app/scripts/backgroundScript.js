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

var remoteScrape = function (url, cb) {
  jQuery.post('http://localhost:3000/api/scrape', {
    url: url
  }, cb);
};

window.refresh = function (cb) {
  var items = window.cheapBackground.store;
  var changed = false;
  var toProc = items.length;
  items.forEach(function (item, i) {
    remoteScrape(item.url, function (updatedItem) {
      if (updatedItem &&
          items[i].price !== updatedItem.price) {

        changed = true;
        items[i].price = updatedItem.price;
      }
      toProc -= 1;
      if (toProc === 0) {
        cb(changed);
      }
    });
  });
};

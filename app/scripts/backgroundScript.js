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
window.store = store;

// hash of URLs
window.history = {};


var remoteScrape = function (url, cb) {
  jQuery.post('http://localhost:3000/api/scrape', {
    url: url
  }, cb);
};

window.refresh = function (cb) {
  var items = window.store;
  var changed = false;
  var toProc = items.length;

  // if there are no items, immediately return that there was no change
  if (items.length === 0) {

    // needs to be called async because Angular
    setTimeout(function () {
      cb(false);
    }, 0);
  }
  items.forEach(function (item, i) {
    remoteScrape(item.url, function (updatedItem) {
      if (updatedItem) {
        if (items[i].price !== updatedItem.price) {

          changed = true;
          items[i].price = updatedItem.price;
        }
        history[item.url] =  history[item.url] || [];
        history[item.url].push({
          price: item.price,
          time: Date.now()
        });
      }
      toProc -= 1;
      if (toProc === 0) {
        if (cb) {
          cb(changed);
        }
        if (changed) {
          chrome.browserAction.setBadgeBackgroundColor([100, 255, 100, 100]);
        }
      }
    });
  });
};

// one hour
var interval = 1000 * 60 * 60;

setInterval(function () {
  window.refresh();
}, interval);

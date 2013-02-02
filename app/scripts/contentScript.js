
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
  try {
    cb({
      price: document.getElementsByClassName('priceLarge')[0].innerText,
      name: 'robot'
    });
  } catch (e) {
    cb(null);
  }
};

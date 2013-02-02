angular.module('cheaperApp')
  .factory('chromeApp', function ($rootScope, scrape) {

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

    commands.addItem = function (pl) {
      setTimeout(function () {
        $rootScope.$apply(function () {
          onUpdateItems.forEach(function (updateFn) {
            updateFn.apply(pl, [pl]);
          });
        });
      }, 0);
    };

    var onUpdateItems = [];

    return {
      addUpdateListener: function (fn) {
        onUpdateItems.push(fn);
      },

      getItems: function () {
        return chrome.extension.getBackgroundPage().cheapBackground.store || [];
      },

      setItems: function (value) {
        chrome.extension.getBackgroundPage().cheapBackground.store = value;
      },

      openTab: function () {
        chrome.tabs.create({
          url: 'tab.html'
        });
      },

      refresh: function (cb) {
        var items = chrome.extension.getBackgroundPage().cheapBackground.store;
        var changed = false;
        var toProc = items.length;
        items.forEach(function (item, i) {
          scrape.getItem(item.url, function (updatedItem) {
            if (items[i].price !== updatedItem.price) {
              changed = true;
              items[i].price = updatedItem.price;
            }
            toProc -= 1;
            if (toProc === 0) {
              cb(changed);
            }
          });
        });
      }
    };
  });

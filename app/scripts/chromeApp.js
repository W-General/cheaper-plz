angular.module('cheaperApp')
  .factory('chromeApp', function ($rootScope) {

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
        return chrome.extension.getBackgroundPage().store || [];
      },

      setItems: function (value) {
        chrome.extension.getBackgroundPage().store = value;
      },

      openTab: function () {
        chrome.tabs.create({
          url: 'tab.html'
        });
      },

      refresh: function (cb) {
        chrome.extension.getBackgroundPage().refresh(function (diff) {
          $rootScope.$apply(function () {
            cb(diff);
          });
        });
      }
    };
  });

angular.module('cheaperApp', []).
  controller('MainCtrl',
    function ($scope, chromeApp) {
      $scope.items = chrome.extension.getBackgroundPage().cheapBackground.store || [];

      chromeApp.addUpdateListener(function (item) {
        $scope.items = chrome.extension.getBackgroundPage().cheapBackground.store || [];
      });

      $scope.scrape = function () {
        chrome.tabs.getSelected(null, function (tab) {
          chrome.tabs.sendMessage(tab.id, {
            command: 'scrape'
          });
        });
      };

    });

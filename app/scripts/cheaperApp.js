angular.module('cheaperApp', []).
  controller('MainCtrl',
    function ($scope, chromeApp) {
      $scope.items = chromeApp.getItems();

      chromeApp.addUpdateListener(function (item) {
        $scope.items = chromeApp.getItems();
      });

      $scope.scrape = function () {
        chrome.tabs.getSelected(null, function (tab) {
          chrome.tabs.sendMessage(tab.id, {
            command: 'scrape'
          });
        });
      };

    });

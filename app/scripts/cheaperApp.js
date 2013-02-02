angular.module('cheaperApp', []).
  controller('MainCtrl',
    function ($scope) {
      $scope.items = [
        { name: 'robot', price: "123"}
      ];

      $scope.scrape = function () {
        chrome.tabs.getSelected(null, function (tab) {
          chrome.tabs.sendMessage(tab.id, {
            command: 'scrape'
          }, function (item) {
            if (item) {
              $scope.$apply(function () {
              });
            }
          });
        });
      };

    });

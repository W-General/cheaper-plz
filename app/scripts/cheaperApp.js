/*global angular:false, chrome:false*/
'use strict';

angular.module('cheaperApp', []).
  controller('MainCtrl',
    function ($scope, chromeApp) {
      $scope.items = chromeApp.getItems();

      chromeApp.addUpdateListener(function () {
        $scope.items = chromeApp.getItems();
      });

      $scope.scrape = function () {
        chrome.tabs.getSelected(null, function (tab) {
          chrome.tabs.sendMessage(tab.id, {
            command: 'scrape'
          });
        });
      };

      $scope.refresh = chromeApp.refresh;
      $scope.openTab = chromeApp.openTab;

    });

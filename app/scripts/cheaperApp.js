/*global angular:false, chrome:false*/
'use strict';

angular.module('cheaperApp', []).
  controller('MainCtrl',
    function ($scope, chromeApp, scrape) {
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

      scrape.getItems();

    });

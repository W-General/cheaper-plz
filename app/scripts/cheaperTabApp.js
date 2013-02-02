/*global angular:false, chrome:false*/
'use strict';

angular.module('cheaperApp', []).
  controller('MainCtrl',
    function ($scope, chromeApp) {
      $scope.greeting = 'hi';

      $scope.items = chromeApp.getItems();

      chromeApp.addUpdateListener(function () {
        $scope.items = chromeApp.getItems();
      });

      $scope.changed = '';
      $scope.refreshButton = true;

      $scope.refresh = function () {
        $scope.changed = '';
        $scope.refreshButton = false;
        chromeApp.refresh(function (changed) {
          $scope.changed = changed ?
            'Items were updated!' : 'Nothing new!';

          $scope.refreshButton = true;
        });
      };

      $scope.data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1];

      $scope.addData = function () {
        $scope.data.push(4);
      };

    });

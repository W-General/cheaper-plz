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

      $scope.refresh = function () {
        chromeApp.refresh(function (changed) {
          $scope.changed = changed ?
            'Items were updated!' : 'Nothing new!';
        });
      };

    });

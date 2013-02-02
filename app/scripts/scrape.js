/*global angular:false*/
'use strict';

angular.module('cheaperApp')
  .factory('scrape', function ($http) {

    var getItem = function (url, cb) {
      $http.post('http://localhost:3000/api/scrape', {
        url: url
      }).success(function (item) {
        cb(item);
      });
    };

    return {
      getItem: getItem
    };
  });

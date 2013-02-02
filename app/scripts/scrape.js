/*global angular:false*/
'use strict';

angular.module('cheaperApp')
  .factory('scrape', function ($http) {

    var urls = ['http://www.amazon.com/headphone-microphone-Touch-iphone-Generic/dp/B0021IPXUG/ref=pd_ts_zgc_e_172541_1?ie=UTF8&s=electronics&pf_rd_p=1367759642&pf_rd_s=right-6&pf_rd_t=101&pf_rd_i=507846&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=01HA3PCB95VN35ZM8R9S'];

    var prices = [];

    var getItems = function () {
      urls.forEach(function (url) {
        $http.post('http://localhost:3000/api/scrape', {
          url: url
        }).success(function (item) {
          console.log(item);
        });
      });
    };

    return {
      getItems: getItems
    };
  });

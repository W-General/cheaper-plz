(function () {

var definitions = {
  amazon: function (document) {
    return {
      name: document.getElementsByClassName('parseasinTitle')[0].innerText.trim(),
      price: document.getElementsByClassName('priceLarge')[0].innerText.match(/\d+\.\d{1,2}/)[0]
    };
  },
  ebay: function (document) {
    return {
      name: document.getElementsByClassName('it-ttl')[0].innerText.trim(),
      price: document.getElementsByClassName('vi-price')[0].innerText.match(/\d+\.\d{1,2}/)[0]
    };
  },

  // default
  na: function () {
    return null;
  }
};

var determineSite = function (document) {
  // TODO: this is naive
  if (document.location.host === 'www.amazon.com') {
    return 'amazon';
  }
  if (document.location.host === 'www.ebay.com') {
    return 'ebay';
  }
  return 'na';
};

window.getDefinition = function (document) {
  var item = definitions[determineSite(document)](document);
  item.url = document.location.toString();
  return item;
};

}());

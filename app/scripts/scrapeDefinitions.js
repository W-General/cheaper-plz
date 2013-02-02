var definitions = {
  amazon: function (document) {
    return {
      name: document.getElementsByClassName('parseasinTitle')[0].innerText.trim(),
      price: document.getElementsByClassName('priceLarge')[0].innerText.trim(),
      url: document.location.toString()
    };
  },
  ebay: function (document) {
    return {
      name: document.getElementsByClassName('it-ttl')[0].innerText.trim(),
      price: document.getElementsByClassName('vi-price')[0].innerText.trim(),
      url: document.location.toString()
    };
  }
};

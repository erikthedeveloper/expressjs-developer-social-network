// Assuming some App global variable....
var App = {
  name: "My Great App"
};

(function($) {

  /**
   * HttpSpoofer
   *  Allow something like this
   *      <a href="/users/joeblow99" data-http-method="DELETE" data-confirm-msg="Are you sure?!">Delete joeblow99</a>
   *      to do exactly what you would hope it does :)
   */
  var HttpSpoofer = {

    init: function() {
      this.http_method_links = $("a[data-http-method]");
      this.http_method_forms = $("form[data-http-method]");
      this.registerEventListeners();
    },

    registerEventListeners: function() {
      this.http_method_links.on('click', this.httpSpoofedLinkClickHandler);
      this.http_method_forms.on('submit', this.httpSpoofedFormSubmitHandler);
    },

    httpSpoofedFormSubmitHandler: function(event) {
      var form = $(this);
      alert('WIP baby!');
    },

    httpSpoofedLinkClickHandler: function(event) {

      var link = $(this);
      var method = link.data('http-method').toUpperCase();

      if ($.inArray(method, ['PUT', 'DELETE']) == -1)
        return;

      event.preventDefault();

      if (!HttpSpoofer.verifyConfirm(link))
        return false;

      $.ajax(link.href, {
        method: method
      })
          .done(HttpSpoofer.getAjaxSuccess())
          .fail(HttpSpoofer.getAjaxFail());

    },

    getAjaxSuccess: function() {
      var callback =
            // TODO: magicallyResolveCallback('ajaxSuccess');
              function() {
                alert("getAjaxSuccess called!")
              };
      return callback;
    },

    getAjaxFail: function() {
      var callback =
            // TODO: magicallyResolveCallback('ajaxFail');
              function() {
                alert("getAjaxFail called!")
              };
      return callback;
    },

    verifyConfirm: function(link) {
      var msg = link.data('confirm-msg') || "Are you sure?";
      return confirm(msg);
    }

  };

  App.HttpSpoofer = HttpSpoofer;
  App.HttpSpoofer.init();

})(jQuery);

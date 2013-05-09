/*
 * customAlert
 * 
 * https://github.com/Mystist/customAlert
 *
 * Copyright (c) 2013 Foundation and other contributors
 *
 * License: https://github.com/Mystist/customAlert/blob/master/MIT-LICENSE.txt
 *
 */

(function($) {

  var methods = {

    init: function() {
    
      var $this = this;
      window.alert = function(str) {
        $this.find(".message").html(str);
        $this.find(".close").unbind("click").bind("click", function() {
          $this.hide();
        });
        $this.show();
      }
      
    },
    
    confirm: function(options) {
    
      var defaults = {
        "message": "Confirm?",
        "yes": function() {},
        "no": function() {}
      };
      var settings = $.extend(defaults, options);
      
      var $this = this;
      
      $this.find(".message").html(settings.message);
      $this.find(".close").unbind("click").bind("click", function() {
        $this.hide();
      });
      $this.find(".yes").unbind("click").bind("click", function() {
        settings.yes();
        $this.hide();
      });
      $this.find(".no").unbind("click").bind("click", function() {
        settings.no();
        $this.hide();
      });
      
      $this.show();
    
    }

  };

  $.fn.customAlert = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('No ' + method + ' method.');
    }
  };

})(jQuery);
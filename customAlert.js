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

  var $originFocus = null;

  var methods = {

    init: function() {
    
      var $this = this;      
      window.alert = function(message, title) {
      
        $this.find(".message").html(message);
        if(title) {
          $this.find(".title").html(title).show();
        } else {
          $this.find(".title").html(title).hide();
        }
        
        $this.find(".close").unbind("click").bind("click", function() {
          $this.hide();
          setTimeout(function() {
            $originFocus.focus();
          }, 500);
        });
        setTimeout(function() {
          $originFocus = $(document.activeElement);
          $this.show().find(".close").last().focus();
        }, 1);
        
        $this.find(".close").last().unbind("keydown").bind("keydown", function(e) {
          if(e.keyCode==13) {
            $(this).click();
          }
        });
        
      }
      
    },
    
    confirm: function(options) {
    
      var defaults = {
        "message": "Confirm?",
        "title": "",
        "yes": function() {},
        "no": function() {}
      };
      var settings = $.extend(defaults, options);
      
      var $this = this;
      
      $this.find(".message").html(settings.message);
      if(settings.title) {
        $this.find(".title").html(settings.title).show();
      } else {
        $this.find(".title").hide();
      }
      
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
      
      setTimeout(function() {
        $this.show().find(".yes").last().focus();
      }, 1);

      $this.find(".yes").last().unbind("keydown").bind("keydown", function(e) {
        if(e.keyCode==13) {
          settings.yes();
          $(this).click();
        } else if(e.keyCode==27) {
          settings.no();
          $this.find(".no").last().click();
        }
      });
    
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
define('test1/controllers/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      login: function login() {
        var username = this.get("username");
        document.location = "/" + username;
      }
    }
  });

});
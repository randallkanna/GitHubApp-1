define('test1/routes/user', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      var promise1 = new Ember['default'].RSVP.Promise(function (resolve, reject) {
        Ember['default'].$.ajax({
          type: "GET",
          url: "https://api.github.com/users/" + params.username,
          success: resolve,
          error: reject
        });
      }).then(function (response) {
        return response;
      }, function () {});

      var promise2 = new Ember['default'].RSVP.Promise(function (resolve, reject) {
        Ember['default'].$.ajax({
          type: "GET",
          url: "https://api.github.com/users/" + params.username + "/repos",
          success: resolve,
          error: reject
        });
      }).then(function (response) {
        return response;
      }, function () {});

      return Ember['default'].RSVP.hash({
        user: promise1,
        repos: promise2
      });
    }
  });

});
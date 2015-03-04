import Ember from "ember";

export default Ember.Route.extend({
  model: function model(params) {
    var promise1 = new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        type: "GET",
        url: "https://api.github.com/users/" + params.username,
        success: resolve,
        error: reject
      });
    }).then(function (response) {
      return response;
    }, function () {});

    var promise2 = new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        type: "GET",
        url: "https://api.github.com/users/" + params.username + "/repos",
        success: resolve,
        error: reject
      });
    }).then(function (response) {
      return response;
    }, function () {});

    return Ember.RSVP.hash({
      user: promise1,
      repos: promise2
    });
  }
});
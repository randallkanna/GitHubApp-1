define('test1/router', ['exports', 'ember', 'test1/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route("index", { path: "/" });
    this.resource("user", { path: "/:username" }, function () {
      this.route("repo", { path: "/:username/:reponame" });
    });
  });

  exports['default'] = Router;

});
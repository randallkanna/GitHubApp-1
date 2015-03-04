/* jshint ignore:start */

/* jshint ignore:end */

define('test1/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'test1/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
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
define('test1/initializers/app-version', ['exports', 'test1/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;

  exports['default'] = {
    name: "App Version",
    initialize: function initialize(container, application) {
      var appName = classify(application.toString());
      Ember['default'].libraries.register(appName, config['default'].APP.version);
    }
  };

});
define('test1/initializers/export-application-global', ['exports', 'ember', 'test1/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
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
define('test1/routes/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('test1/routes/repo', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
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
define('test1/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1,"id","title");
        var el2 = dom.createTextNode("GitHub App");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,1,2,contextualElement);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('test1/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","alert alert-danger");
          var el2 = dom.createTextNode("Invalid username or password.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createElement("form");
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, get = hooks.get, inline = hooks.inline, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = fragment;
        var morph0 = dom.createMorphAt(element0,0,1);
        var morph1 = dom.createMorphAt(element0,1,-1);
        element(env, element0, context, "action", ["login"], {"on": "submit"});
        inline(env, morph0, context, "input", [], {"value": get(env, context, "username"), "id": "username", "placeholder": "Username"});
        block(env, morph1, context, "if", [get(env, context, "loginFailed")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('test1/templates/repo', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createElement("div");
        dom.setAttribute(el0,"class","row");
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-md-1");
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-md-7");
        var el2 = dom.createTextNode(" \n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode("Repository Name");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","dropdown");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"class","btn btn-default dropdown-toggle");
        dom.setAttribute(el3,"type","button");
        dom.setAttribute(el3,"id","dropdownMenu1");
        dom.setAttribute(el3,"data-toggle","dropdown");
        dom.setAttribute(el3,"aria-expanded","true");
        var el4 = dom.createTextNode("\n          Sort By\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","caret");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","dropdown-menu");
        dom.setAttribute(el3,"role","menu");
        dom.setAttribute(el3,"aria-labelledby","dropdownMenu1");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"role","presentation");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"role","menuitem");
        dom.setAttribute(el5,"tabindex","-1");
        dom.setAttribute(el5,"href","#");
        var el6 = dom.createTextNode("Starring");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"role","presentation");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"role","menuitem");
        dom.setAttribute(el5,"tabindex","-1");
        dom.setAttribute(el5,"href","#");
        var el6 = dom.createTextNode("Forked");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"role","presentation");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"role","menuitem");
        dom.setAttribute(el5,"tabindex","-1");
        dom.setAttribute(el5,"href","#");
        var el6 = dom.createTextNode("Watching");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","well");
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode(" Filename ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","well");
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode(" Filename ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","well");
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode(" Filename ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","well");
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode(" Filename ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-md-2");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","panel panel-default");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","panel-heading");
        var el4 = dom.createTextNode("Repo");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","panel-body");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","btn-info");
        var el5 = dom.createTextNode("Star this repo");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","list-group");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","list-group-item");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","#");
        var el6 = dom.createTextNode("Issues");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","list-group-item");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","#");
        var el6 = dom.createTextNode("Stars");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","list-group-item");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","#");
        var el6 = dom.createTextNode("Watching");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","list-group-item");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","#");
        var el6 = dom.createTextNode("Forks");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('test1/templates/user', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","well");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),-1,-1);
          content(env, morph0, context, "name");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createElement("div");
        dom.setAttribute(el0,"class","row");
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-md-1");
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-md-2");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","panel panel-default");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","panel-heading");
        var el4 = dom.createTextNode("About");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","panel-body");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","avatar_url");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","list-group");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","list-group-item");
        var el5 = dom.createTextNode("Name: ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","list-group-item");
        var el5 = dom.createTextNode("Company: ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","list-group-item");
        var el5 = dom.createTextNode("BlogURL: ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","list-group-item");
        var el5 = dom.createTextNode("Follower Count: ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","list-group-item");
        var el5 = dom.createTextNode("Following Count: ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","list-group-item");
        var el5 = dom.createTextNode("Creation Date: ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-md-7");
        var el2 = dom.createTextNode(" \n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode("Repositories");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [3]);
        var element1 = dom.childAt(element0, [3, 5]);
        var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),-1,-1);
        var morph1 = dom.createMorphAt(dom.childAt(element1, [1]),0,-1);
        var morph2 = dom.createMorphAt(dom.childAt(element1, [3]),0,-1);
        var morph3 = dom.createMorphAt(dom.childAt(element1, [5]),0,-1);
        var morph4 = dom.createMorphAt(dom.childAt(element1, [7]),0,-1);
        var morph5 = dom.createMorphAt(dom.childAt(element1, [9]),0,-1);
        var morph6 = dom.createMorphAt(dom.childAt(element1, [11]),0,-1);
        var morph7 = dom.createMorphAt(dom.childAt(fragment, [5]),2,3);
        content(env, morph0, context, "login");
        content(env, morph1, context, "model.user.name");
        content(env, morph2, context, "model.user.company");
        content(env, morph3, context, "model.user.blog");
        content(env, morph4, context, "model.user.followers");
        content(env, morph5, context, "model.user.following");
        content(env, morph6, context, "model.user.created_at");
        block(env, morph7, context, "each", [get(env, context, "model.repos")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('test1/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(false, 'app.js should pass jshint.\napp.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 2, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 3, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 4, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 16, col 1, \'export\' is only available in ES6 (use esnext option).\n\n5 errors'); 
  });

});
define('test1/tests/controllers/index.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/index.js should pass jshint', function() { 
    ok(false, 'controllers/index.js should pass jshint.\ncontrollers/index.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/index.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('test1/tests/helpers/resolver', ['exports', 'ember/resolver', 'test1/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('test1/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('test1/tests/helpers/start-app', ['exports', 'ember', 'test1/app', 'test1/router', 'test1/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('test1/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('test1/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(false, 'router.js should pass jshint.\nrouter.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nrouter.js: line 2, col 1, \'import\' is only available in ES6 (use esnext option).\nrouter.js: line 15, col 1, \'export\' is only available in ES6 (use esnext option).\n\n3 errors'); 
  });

});
define('test1/tests/routes/index.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/index.js should pass jshint', function() { 
    ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/index.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('test1/tests/routes/repo.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/repo.js should pass jshint', function() { 
    ok(false, 'routes/repo.js should pass jshint.\nroutes/repo.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/repo.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('test1/tests/routes/user.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/user.js should pass jshint', function() { 
    ok(false, 'routes/user.js should pass jshint.\nroutes/user.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/user.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('test1/tests/test-helper', ['test1/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('test1/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('test1/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:index", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('test1/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
define('test1/tests/unit/routes/repo-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:repo", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('test1/tests/unit/routes/repo-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/repo-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/repo-test.js should pass jshint.'); 
  });

});
define('test1/tests/unit/routes/repos-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:repos", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('test1/tests/unit/routes/repos-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/repos-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/repos-test.js should pass jshint.'); 
  });

});
define('test1/tests/unit/routes/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:user", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('test1/tests/unit/routes/user-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/user-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/user-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('test1/config/environment', ['ember'], function(Ember) {
  var prefix = 'test1';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("test1/tests/test-helper");
} else {
  require("test1/app")["default"].create({"name":"test1","version":"0.0.0.961ff28b"});
}

/* jshint ignore:end */
//# sourceMappingURL=test1.map
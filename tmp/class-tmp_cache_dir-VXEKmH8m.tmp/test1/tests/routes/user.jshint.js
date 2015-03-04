define('test1/tests/routes/user.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/user.js should pass jshint', function() { 
    ok(false, 'routes/user.js should pass jshint.\nroutes/user.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/user.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
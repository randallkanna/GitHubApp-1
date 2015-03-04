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

import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
    var user = Ember.$.getJSON('https://api.github.com/users/' + params.username).then(function(data) {
    	debugger
		});
	}
});

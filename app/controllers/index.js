import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function() {
      var username = this.get("username");
      document.location = "/" + username;
    }
  }
});

App = Ember.Application.create();

App.Router.reopen({
  rootURL: '/mychoice-demo/'
});

App.Router.map(function() {
  this.resource('quizzes');
  this.route('user-profile', { path: "/user"});
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('quizzes');
  }
});

App.ApplicationController = Ember.Controller.extend({
  needs: 'user-profile',
  user: Ember.computed.alias("controllers.user-profile")
});

App.UserProfileController = Ember.ObjectController.extend({
  id: 1,
  userName: 'manuel_mitasch',
  firstName: "Manuel",
  lastName: "Mitasch",
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

  actions: {
    saveUser: function() {
      alert("Changes saved");
    }
  }
});

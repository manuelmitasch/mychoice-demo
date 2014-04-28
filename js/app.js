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


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

App.QuizzesRoute = Ember.Route.extend({
  model: function() {
    return [
      { id: 1, name: 'Fun with flags #1', tags: [1], owner: 1 },
      { id: 2, name: 'Fun with flags #2', tags: [1], owner: 2 },
      { id: 3, name: 'Fun with flags #3', tags: [1], owner: 1 },
      { id: 4, name: 'French vocabulary #1', tags: [1,2], owner: 1 },
      { id: 5, name: 'Service Engineering Exam SS2014', tags: [3], owner: 1 }
    ]
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


App.QuizzesController = Ember.ArrayController.extend({
  needs: 'user-profile',

  filterMyQuizzes: false,
  filterByTag: 0,

  tags: [
    {name: "Select all", id: 0},
    {name: "Quiz", id: 1},
    {name: "Learn", id: 2},
    {name: "Exam", id: 3}
  ],

  filteredQuizzes: function() {
    var result = this.get('content'),
        filterByTag = this.get('filterByTag'),
        currentUserId = this.get('controllers.user-profile.id');

    // filter my quizzes
    if (this.get('filterMyQuizzes')) {
      result = result.filterProperty('owner', currentUserId);
    }

    // filter by selected tag
    if (this.get('filterByTag') !== 0) {
      result = result.filter(function(item) {
        return item.tags.contains(filterByTag);
      });
    }

    return result;
  }.property('content.@each', 'filterMyQuizzes', 'filterByTag')

});

import Ember from 'ember';

export default Ember.ObjectController.extend({
  usernm: '',
  pass: '',
  emptyUsernm: function () {
    return Ember.empty(this.get('usernm'));
  }.property('usernm'),
  emptyPass: function () {
    return Ember.empty(this.get('pass'));
  }.property('pass'),
  actions: {
    signin: function () {
    }
  }
});

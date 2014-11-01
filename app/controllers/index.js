import Ember from 'ember';

export default Ember.Controller.extend({
  symbol: '',
  empty: function () {
    return Ember.isEmpty(this.get('symbol'));
  }.property('symbol'),
  actions: {
    search: function () {
      alert('TODO');
    }
  }
});

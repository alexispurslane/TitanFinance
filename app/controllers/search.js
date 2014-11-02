import Ember from 'ember';

export default Ember.ArrayController.extend({
  amount: 1,
  symbol: '',
  flist: [],
  empty: function () {
    return Ember.isEmpty(this.get('symbol'));
  }.property('symbol'),
  actions: {
    search: function () {
      var list = this.get('content'),
        filter = this.get('symbol').toLowerCase();

      if (!filter) { return list; }

      this.set('flist', list.filter(function(item) {
        return item.get('symbol').toLowerCase().indexOf(filter) !== -1 || item.get('name').toLowerCase().indexOf(filter) !== -1;
      }));
    }
  }
});

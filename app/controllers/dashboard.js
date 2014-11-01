import Ember from 'ember';

export default Ember.ArrayController.extend({
  symbols: '',
  empty: function () {
    return Ember.isEmpty(this.get('symbols'));
  }.property('symbols'),
  filteredSyms: function () {
    var symbolSearch = this.get('symbols').toLowerCase();
    if (symbolSearch  === '') {
      return this.get('content');
    } else {
      return this.get('content').filter(function (item) {
        return item.get('symbol').toLowerCase().indexOf(symbolSearch) !== -1;
      });
    }
  }.property('content', 'symbols'),
  actions: {
    view: function () {
      alert('TODO');
    },
    clear: function () {
      this.set('symbols', '');
    }
  }
});

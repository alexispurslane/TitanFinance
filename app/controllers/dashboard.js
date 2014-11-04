import Ember from 'ember';

export default Ember.ObjectController.extend({
  symbols: '',
  howMuch: [],
  clicked: 0,
  empty: function () {
    return Ember.isEmpty(this.get('symbols'));
  }.property('symbols'),
  filteredSyms: function () {
    var symbolSearch = this.get('symbols').toLowerCase();
    if (symbolSearch  === '') {
      return this.get('content').filterBy('uid', window.ref.getAuth().uid);
    } else {
      return this.get('content').filterBy('uid', window.ref.getAuth().uid).filter(function (item) {
        return item.get('symbol').toLowerCase().indexOf(symbolSearch) !== -1;
      });
    }
  }.property('content', 'symbols'),
  actions: {
    change: function (id) {
      this.get('.user').money -= this.get('content').stocks[id].worth * Ember.$('#'+id).val();
      this.get('content')[id].number += Ember.$('#'+id).val();
    },
    clear: function () {
      this.set('symbols', '');
    }
  }
});

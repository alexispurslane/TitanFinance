import Ember from 'ember';

export default Ember.ArrayController.extend({
  symbols: '',
  clicked: 0,
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
      if (this.get('clicked') === 1) {
        Ember.$('.nav-slid-hidden').animate({
          top: '-=66'
        }, 1000);
        this.set('clicked', 0);
      } else {
        Ember.$('.nav-slid-hidden').animate({
          top: '+=66'
        }, 1000);
        this.set('clicked', this.get('clicked') + 1);
      }
    },
    clear: function () {
      this.set('symbols', '');
    }
  }
});

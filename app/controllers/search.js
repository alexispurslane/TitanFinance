import Ember from 'ember';

export default Ember.ArrayController.extend({
  amount: 1,
  symbol: '',
  flist: [],
  flist1: [],
  place: 0,
  empty: function () {
    return Ember.isEmpty(this.get('symbol'));
  }.property('symbol'),
  canPrev: function () {
    return this.get('place') > 0;
  }.property('flist1'),
  canNext: function () {
    return this.get('flist1').length > this.get('place');
  }.property('flist1'),
  actions: {
    search: function () {
      var list = this.get('content'),
        filter = this.get('symbol').toLowerCase();

      if (!filter) { return list; }

      this.set('flist1', list.filter(function(item) {
        return item._data.Symbol.toLowerCase().indexOf(filter) !== -1 || item._data.Name.toLowerCase().indexOf(filter) !== -1;
      }));
      this.set('flist', this.get('flist1').slice(this.get('place'), this.get('place')+10));
    },
    next: function () {
      this.set('place', this.get('place')+10);
      this.send('search');
    },
    prev: function () {
      this.set('place', this.get('place')-10);
      this.send('search');
    }
  }
});

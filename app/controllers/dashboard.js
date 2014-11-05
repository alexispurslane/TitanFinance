import Ember from 'ember';

export default Ember.ObjectController.extend({
  symbols: '',
  howMuch: [],
  clicked: 0,
  empty: function () {
    return Ember.isEmpty(this.get('symbols'));
  }.property('symbols'),
  filteredStocks: function () {
    return this.get('content').stocks.filterBy('uid', window.ref.getAuth().uid);
  }.property(),
  user: function () {
    var self = this;
    return this.get('content').user.filter(function (e) {
      self.set('it', self.get('content').user.indexOf(e));
      console.log(self.get('it'));
      return e.get('uid') === window.ref.getAuth().uid;
    })[0];
  }.property(),
  filteredSyms: function () {
    var symbolSearch = this.get('symbols').toLowerCase();
    if (symbolSearch  === '') {
      return this.get('filteredStocks');
    } else {
      return this.get('filteredStocks').filter(function (item) {
        return item.get('symbol').toLowerCase().indexOf(symbolSearch) !== -1;
      });
    }
  }.property('content', 'symbols'),
  actions: {
    change: function (id) {
      console.log(this.get('it'));
      var user = this.get('user');
      var stock = this.get('filteredStocks')[id],
          value = Ember.$('#'+id).val();
      console.log(this.get('it'));
      window.ref.child('users').child(this.get('it')).set({
        money: user.get('money') - stock.get('worth') * parseInt(value),
        uid: user.get('uid')
      });
      console.log(this.get('it'));
      window.ref.child('stocks').child(id).set({
        number: stock.get('number') + parseInt(value),
        uid: window.ref.getAuth().uid,
        name: stock.get('name'),
        symbol: stock.get('symbol'),
        worth: stock.get('worth'),
        cost: stock.get('cost')
      });
      console.log(this.get('it'));
    },
    clear: function () {
      this.set('symbols', '');
    }
  }
});

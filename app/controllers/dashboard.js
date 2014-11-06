import Ember from 'ember';

export default Ember.ObjectController.extend({
  symbols: '',
  howMuch: [],
  clicked: 0,
  weekEarnings: 1120,
  quartEarnings: 1120,
  yearEarnings: 1120,
  changedWeek: function () {
    return Math.abs(Math.floor((((this.get('user').get('money')-this.get('weekEarnings')) - this.get('user').get('money')) / ((this.get('user').get('money')-this.get('weekEarnings')))) * 100));
  }.property('user.money', 'weekEarnings'),
  changedQuart: function () {
    return Math.abs(Math.floor((((this.get('user').get('money')-this.get('weekEarnings')) - this.get('user').get('money')) / ((this.get('user').get('money')-this.get('quartEarnings')))) * 100));
  }.property('user.money', 'quartEarnings'),
  changedYear: function () {
    return Math.abs(Math.floor((((this.get('user').get('money')-this.get('weekEarnings')) - this.get('user').get('money')) / ((this.get('user').get('money')-this.get('quartEarnings')))) * 100));
  }.property('user.money', 'yearEarnings'),
  empty: function () {
    return Ember.isEmpty(this.get('symbols'));
  }.property('symbols'),
  filteredStocks: function () {
    return this.get('content').stocks.filterBy('uid', window.ref.getAuth().uid).filter(function (item) {
      return item.get('number') > 0;
    });
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
      var user = this.get('user'),
      stock = this.get('filteredStocks')[id],
      value = Ember.$('#'+id).val(),
      newMoney = user.get('money') - stock.get('worth') * parseInt(value),
      newStocks = stock.get('number') + parseInt(value),
      m;
      try {
        if (newMoney < 0) {
          throw new Error('You cannot buy that many stocks, because you would go negative.');
        } else if (newStocks < 0) {
          throw new Error('You cannot sell that many stocks, because you don\'t have that many.');
        }

        window.ref.child('users').child(this.get('it')).set({
          money: newMoney,
          uid: user.get('uid')
        });
        window.ref.child('stocks').child(id).set({
          number: newStocks,
          uid: window.ref.getAuth().uid,
          name: stock.get('name'),
          symbol: stock.get('symbol'),
          worth: stock.get('worth'),
          cost: stock.get('cost')
        });
      } catch (e) {
        m = e.message || 'There was an error.';
        this.set('error', m);
      } finally {
        m = 'You have successfully ' + (parseInt(value) < 0? 'sold' : 'bought') + ' ' + Math.abs(parseInt(value)) + ' stocks.';
        this.set('success', m);
      }
    },
    clear: function () {
      this.set('symbols', '');
    },
  }
});

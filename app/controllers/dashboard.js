import Ember from 'ember';

export default Ember.ObjectController.extend({
  symbols: '',
  howMuch: [],
  clicked: 0,
  options: {
    // whether to hide the notification on click
    clickToHide: true,
    // whether to auto-hide the notification
    autoHide: true,
    // if autoHide, hide after milliseconds
    autoHideDelay: 4000,
    // show the arrow pointing at the element
    arrowShow: true,
    // arrow size in pixels
    arrowSize: 5,
    // default positions
    elementPosition: 'bottom left',
    globalPosition: 'top',
    // default style
    style: 'metro',
    // default class (string or [string])
    className: 'error',
    // show animation
    showAnimation: 'slideDown',
    // show animation duration
    showDuration: 400,
    // hide animation
    hideAnimation: 'slideRight',
    // hide animation duration
    hideDuration: 200,
    // padding between element and notification
    gap: 4
  },
  weekEarnings: function () {
    var date1 = new Date(localStorage.weekDate) || new Date('5/6/2011');
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays >= 7) {
      localStorage.weekDate = date2;
      this.set('week', this.get('user').get('money') - 10000);
    }
    return this.get('week');
  }.property(),
  quartEarnings: function () {
    var date1 = new Date(localStorage.quartDate) || new Date('5/6/2011');
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays >= 365.242/4) {
      localStorage.weekDate = date2;
      this.set('week', this.get('user').get('money') - 10000);
    }
    return this.get('week');
  }.property(),
  yearEarnings: function () {
    var date1 = new Date(localStorage.yearDate) || new Date('5/6/2011');
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays >= 365.242) {
      localStorage.weekDate = date2;
      this.set('year', this.get('user').get('money') - 10000);
    }
    return this.get('year');
  }.property(),
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
  }.property('content.stocks.@each'),
  user: function () {
    return this.get('content').user.filter(function (e) {
      return e.get('uid') === window.ref.getAuth().uid;
    })[0];
  }.property('content.user.@each'),
  filteredSyms: function () {
    var symbolSearch = this.get('symbols').toLowerCase();
    if (symbolSearch  === '') {
      return this.get('filteredStocks');
    } else {
      return this.get('filteredStocks').filter(function (item) {
        return item.get('symbol').toLowerCase().indexOf(symbolSearch) !== -1;
      });
    }
  }.property('filteredStocks.@each', 'symbols'),
  actions: {
    change: function (id) {
      var user = this.get('user'),
      stock = this.get('filteredStocks').filterBy('th', id)[0],
      value = Ember.$('#'+id).val(),
      newMoney = user.get('money') - stock.get('worth') * parseInt(value),
      newStocks = stock.get('number') + parseInt(value),
      m,
      catched;
      try {
        if (newMoney < 0) {
          throw new Error('You cannot buy that many stocks, because you would go negative.');
        } else if (newStocks < 0) {
          throw new Error('You cannot sell that many stocks, because you don\'t have that many.');
        }

        window.ref.child('users').child(this.get('content').user.indexOf(user)).set({
          money: newMoney,
          uid: user.get('uid')
        });
        window.ref.child('stocks').child(stock.get('id')).set({
          number: newStocks,
          th: stock.get('th'),
          uid: window.ref.getAuth().uid,
          name: stock.get('name'),
          symbol: stock.get('symbol'),
          worth: stock.get('worth'),
          cost: stock.get('cost')
        });
      } catch (e) {
        m = e.message || 'There was an error.';
        this.set('error', m);
        new PNotify({
          title: 'Error',
          text: m,
          icon: 'glyphicon glyphicon-warning-sign',
          type: 'error',
          animation: 'slide',
          nonblock: {
            nonblock: true,
            nonblock_opacity: 0.2
          },
          shadow: false
        });
        catched = true;
      } if (!catched) {
        m = 'You have successfully ' + (parseInt(value) < 0? 'sold' : 'bought') + ' ' + Math.abs(parseInt(value)) + ' stocks.';
        this.set('success', m);
        new PNotify({
          title: 'Success',
          text: m,
          icon: 'glyphicon glyphicon-ok-circle',
          type: 'success',
          animation: 'slide',
          nonblock: {
            nonblock: true,
            nonblock_opacity: 0.2
          },
          shadow: false
        });
      }
    },
    clear: function () {
      this.set('symbols', '');
    },
  }
});

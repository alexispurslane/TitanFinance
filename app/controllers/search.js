import Ember from 'ember';

export default Ember.ObjectController.extend({
  amount: 1,
  symbol: '',
  flist: [],
  flist1: [],
  place: 0,
  options: {
    // whether to hide the notification on click
    clickToHide: false,
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
  empty: function () {
    return Ember.isEmpty(this.get('symbol'));
  }.property('symbol'),
  canPrev: function () {
    return this.get('place') > 0;
  }.property('flist1'),
  canNext: function () {
    return this.get('flist1').length > this.get('place');
  }.property('flist1'),
  user: function () {
    var self = this;
    return this.get('content').user.filter(function (e) {
      self.set('it', self.get('content').user.indexOf(e));
      console.log(self.get('it'));
      return e.get('uid') === window.ref.getAuth().uid;
    })[0];
  }.property(),
  actions: {
    search: function () {
      var list = this.get('content').stocks,
      filter = this.get('symbol').toLowerCase();

      if (!filter) { return list; }

      this.set('flist1', list.filter(function(item) {
        return item.get('Symbol').toLowerCase().indexOf(filter) !== -1 ||
          item.get('Name').toLowerCase().indexOf(filter) !== -1 ||
          item.get('Sector').toLowerCase().indexOf(filter) !== -1 ||
          item.get('industry').toLowerCase().indexOf(filter) !== -1;
      }));
      this.set('flist', this.get('flist1').slice(this.get('place'), this.get('place')+10));
    },
    buy: function (id) {
      var user = this.get('user'),
      stock = this.get('content').stocks.content[id],
      value = Ember.$('#'+id).val(),
      newMoney = user.get('money') - stock.get('LastSale') * parseInt(value),
      newStocks = parseInt(value),
      m,
      catched;
      try {
        if (newMoney < 0) {
          throw new Error('You cannot buy that many stocks, because you would go negative.');
        } else if (newStocks < 0) {
          throw new Error('You cannot buy that many stocks, because you can\'t buy negitive amounts.');
        }

        window.ref.child('users').child(user.get('id')).set({
          money: newMoney,
          uid: user.get('uid')
        });
        var length;
        window.ref.child('stocks').on('value', function (s) { length = Ember.keys(s.val()).length; });
        var createdStock = this.store.createRecord('stock', {
          th: length,
          number: newStocks,
          uid: window.ref.getAuth().uid,
          name: stock.get('Name'),
          symbol: stock.get('Symbol'),
          worth: stock.get('LastSale'),
          cost: stock.get('LastSale')
        });
        createdStock.save();
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
        m = 'You have successfully bought ' + (parseInt(value)) + ' stocks.';
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

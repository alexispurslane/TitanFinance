import Ember from 'ember';

export default Ember.Route.extend({
  modal: function () {
    return this.store.findAll('stock');
  }
});

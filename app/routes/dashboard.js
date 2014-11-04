import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('stock');
  },
  setupController: function(controller, model) {
    controller.set('content', model);
    var user;
    window.ref.once("value", function(data) {
      user = data.val().users.filter(function (e) {
        return e.uid === window.ref.getAuth().uid;
      })[0];
    });

    controller.set('user', user);
  }
});

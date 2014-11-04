import Ember from 'ember';

export default Ember.ArrayController.extend({
  user: function () {
    var nuser = this.get('content').filterBy('uid', window.ref.getAuth().uid)[0];
    nuser.email = window.ref.getAuth().password.email;
    return nuser;
  }.property(),
  size: 100,
  gravatarUrl: function() {
    var email = this.get('user').email,
        size = this.get('size');

    return 'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
  }.property('user', 'size')
});

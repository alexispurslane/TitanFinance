import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    ok: function () {
      ref.changePassword({
        email       : window.ref.getAuth().password.email,
        oldPassword : this.get('oldPassword'),
        newPassword : this.get('password')
      }, function(error) {
        if (error === null) {
          console.log("Password changed successfully");
        } else {
          console.log("Error changing password:", error);
        }
      });
    },
    sell: function () {

    },
    delete: function () {
      ref.removeUser({
        email    : window.ref.getAuth().password.email,
        password : prompt('Confirm with password.')
      }, function(error) {
        if (error === null) {
          var n = new PNotify({
            title: 'DANGER ACCEPTED',
            text: 'You have successfully deleted your account on TitanFinance.',
            icon: 'glyphicon glyphicon-success',
            type: 'success',
            animation: 'slide',
            nonblock: {
              nonblock: true,
              nonblock_opacity: .2
            },
            shadow: false
          });
          localStorage.signedIn = false;
          window.ref.unauth();
          this.set('signedIn', false);
          this.transitionTo('signin');
          window.location = "/";
        } else {
          var n = new PNotify({
            title: 'DANGER CANCELED',
            text: 'Either you hit cancel or you typed an incorrect password.',
            icon: 'glyphicon glyphicon-warning-sign',
            type: 'error',
            animation: 'slide',
            nonblock: {
              nonblock: true,
              nonblock_opacity: .2
            },
            shadow: false
          });
        }
      });
    },
    cancel: function () {
      this.transitionToRoute('profile');
    }
  }
});

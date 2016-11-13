import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    doLogin (username, password) {
      console.log("Login");
      let user = this.store.createRecord("parseuser");
      console.log(user);
      user.username = username;
      user.password = password;
      user.logIn().then((obj) => {
        console.log(obj);
      });
    }
  }
});

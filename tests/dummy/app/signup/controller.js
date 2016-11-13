import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    doSignUp(username, password) {
      console.log("Signup");
      //const ParseUser = this.store.modelFor('parseuser');
      let user = this.store.createRecord("parseuser");
      console.log(user);
      user.username = username;
      user.password = password;
      user.signUp().then((obj) => {
        console.log(obj);
      });
    }
  }
});

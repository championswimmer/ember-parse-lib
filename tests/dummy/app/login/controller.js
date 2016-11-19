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
    },
    doSignup (username, password) {
      console.log("Signup");
      let user = this.store.createRecord("parseuser");
      user.username = username;
      user.password = password;
      user.signUp().then((obj) => {
        console.log(obj);
      });
    },
    allUsers () {
      this.store.findAll('parseuser').then(function (users) {
        console.log(users);
      });
    },

    findUser (username) {
      queryFilter =
      {
        equalTo: {
          city: "Delhi",
          country: "India"
        },
        notEqualTo: {
          gender: "male"
        },
        lessThan: {
          age: 40,
        },
        lessThanOrEqualTo: {
          hasCars: 4
        },
        greaterThan: {
          age: 20
        },
        greaterThanOrEqualTo: {
          kids: 1
        },
        ascending : ["age", "name"],
        descending: "city"
      }
      this.store.query('parseuser', {equalTo: {'username': username}}).then(function(users) {
        console.log(users);
      });
    }
  }
});

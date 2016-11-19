import DS from 'ember-data';

const Promise = Ember.RSVP.Promise;

const ParseUser =  DS.Model.extend({
  username      : DS.attr("string"),
  password      : DS.attr("string"),
  email         : DS.attr("string"),
  emailVerified : DS.attr("boolean"),
  sessionToken  : DS.attr("string"),
  createdAt     : DS.attr("date"),
  updatedAt     : DS.attr("date"),
  signUp        : function () {
    return new Promise(function (resolve, reject) {
      Parse.User.signUp(this.username, this.password, null, {
        success: function (user) {
          resolve(user);
        },
        error: function (user, error) {
          reject(user,error);
        }
      });
    }.bind(this));
  },
  logIn         : function () {
    return new Promise(function (resolve, reject) {
      Parse.User.logIn(this.username, this.password, {
        success: function (user) {
          resolve(user);
        }.bind(this),
        error: function (user, error) {
          reject(user,error);
        }
      });
    }.bind(this));
  },
  logOut        : function () {
    this.password = undefined;
    return Parse.User.logOut();
  }
});

ParseUser.reopenClass({
  parseClass: "User",
  getThisUser: () => Parse.User.current()
});


export default ParseUser;

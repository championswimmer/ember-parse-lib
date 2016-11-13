import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', {path: '/'});
  this.route('fruits', function() {
    this.route('add');
  });
  this.route('login');
  this.route('signup');
});

export default Router;

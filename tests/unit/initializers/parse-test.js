import Ember from 'ember';
import ParseInitializer from 'dummy/initializers/parse';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | parse', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  ParseInitializer.initialize(application);

  // you would normally confirm the results of the ParseInitializer here
  assert.ok(true);
});

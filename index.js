/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-parse-lib',
  included: function(app) {
    this._super.included(app);

    app.import('bower_components/parse/parse.min.js');
  }
};

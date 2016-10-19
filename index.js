/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-parse-lib',
  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/parse/parse.min.js');
  }
};

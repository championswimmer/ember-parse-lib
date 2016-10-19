import ParseInitializer from "ember-parse-lib/initializers/parse";

export default {
  name: "ember-parse-lib",
  after: "ember-data",
  initialize: ParseInitializer.initialize
};

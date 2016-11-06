import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr("string"),
  colour: DS.attr("string"), //fuck american spellings >.<
  taste: DS.attr("string"),
}).reopenClass({
  parseClass: 'Fruit'
});

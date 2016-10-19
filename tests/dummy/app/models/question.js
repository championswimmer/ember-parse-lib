import DS from 'ember-data';

export default DS.Model.extend({
  question: DS.attr('string')
}).reopenClass({
  parseClass: 'Question'
});

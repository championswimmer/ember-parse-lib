import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveData() {
      console.log('save data');
      console.log(this.store);
      let q = this.store.createRecord('question', {
        question: 'This is another question'
      });
      console.log(q);
      q.save().then(function(q) {
        console.log(q);
      });
    }
  }
});

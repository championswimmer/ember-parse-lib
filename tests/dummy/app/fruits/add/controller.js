import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveFruit() {
      let f = this.store.createRecord('fruits', {
        name: this.get('fruitname'),
        taste: this.get('fruittaste'),
        colour: this.get('fruitcolour')
      });
      console.log(f);
      f.save().then(function(obj) {
        window.alert('Saved'+ f.get('name') +' at object id = ' + obj.id);
      });
    }
  }
});

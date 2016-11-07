import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    refreshFruits() {

      this.store.findAll('fruits').then(function (fruits) {
        console.log(fruits);
        this.set("fruits", fruits);
      }.bind(this));
    },
    findOne() {
      this.store.findRecord('fruits', '2D7dKQbCGZ').then(function(fruit) {
        console.log(fruit);
      });
    },
    deleteFruit(fruit) {
      this.store.findRecord('fruits', fruit.id, { backgroundReload: false }).then(function(froot) {
        froot.destroyRecord();
      }.bind(this));

    }
  }
});

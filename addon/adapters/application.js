import DS from 'ember-data';
import Ember from 'ember';

const Promise = Ember.RSVP.Promise;

export default DS.Adapter.extend({

  serialize: function (snapshot, adapterOptions)  {
    return snapshot.attributes();
  },

  findRecord:  function (store, type, id, snapshot)  {
    return new Promise(function (resolve, reject) {
      let parseClass = type.modelName;

    });
  },
  createRecord: function (store, type, snapshot)  {
    let parseClass = type.parseClass || type.modelName;
    let data = this.serialize(snapshot, { includeId: true });
    let parseObject = new (Parse.Object.extend(parseClass))();
    return new Promise(function (resolve, reject) {
      parseObject.save(data, {
        success: function(obj) {
          resolve(obj);
        },
        error: function(obj, err) {
          reject(obj,err);
        }
      });
    });
  },
  updateRecord: function (store, type, snapshot)  {
    let parseClass = type.modelName;
    let data = this.serialize(snapshot, { includeId: true });
    let id = snapshot.id;

    return new Promise(function (resolve, reject) {

    });
  },
  deleteRecord: function (store, type, snapshot)  {
    let parseClass = type.modelName;
    let data = this.serialize(snapshot, { includeId: true });
    let id = snapshot.id;

    return new Promise(function (resolve, reject) {

    });
  },
  findAll: function (store, type, sinceToken)  {
    let parseClass = type.modelName;
    return new Promise(function (resolve, reject) {

    });
  },
  query: function (store, type, query) {
    let parseClass = type.modelName;

    return new Promise(function (resolve, reject) {

    });
  }

});

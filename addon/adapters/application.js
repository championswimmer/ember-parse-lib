import DS from 'ember-data';
import Ember from 'ember';

const Promise = Ember.RSVP.Promise;

export default DS.Adapter.extend({

  findRecord:  function (store, type, id, snapshot)  {

    let parseClass = type.parseClass || type.modelName;
    let query = new Parse.Query(Parse.Object.extend(parseClass));

    return new Promise(function (resolve, reject) {
      query.get(id, {
        success: function (obj) {
          resolve(obj);
        },
        error: function(obj, err) {
          reject(obj,err);
        }
      });

    });
  },
  createRecord: function (store, type, snapshot)  {
    let parseClass = type.parseClass || type.modelName;
    let data = this.serialize(snapshot);
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
    let parseClass = type.parseClass || type.modelName;
    let data = this.serialize(snapshot, { includeId: true, prune: true });
    data.className = parseClass;
    let parseObject = Parse.Object.fromJSON(data);
    //Explicitly unset null and undefined keys
    Object.keys(data).map((key) => {
      if (!data[key]) {
        parseObject.unset(key);
      }
    });
    console.log(parseObject);

    return new Promise(function (resolve, reject) {
      parseObject.save(null, {
        success: function(obj) {
          resolve(obj);
        },
        error: function(obj, err) {
          reject(obj,err);
        }
      });
    });
  },
  deleteRecord: function (store, type, snapshot)  {
    let parseClass = type.parseClass || type.modelName;
    let data = this.serialize(snapshot, { includeId: true });
    data.className = parseClass;
    let parseObject = Parse.Object.fromJSON(data);
    console.log(parseObject);


    return new Promise(function (resolve, reject) {
      parseObject.destroy({
        success: function(obj) {
          resolve(obj);
        },
        error: function(obj, err) {
          reject(obj,err);
        }
      });
    });
  },
  findAll: function (store, type, sinceToken)  {
    let parseClass = type.parseClass || type.modelName;
    let parseQuery = new Parse.Query(Parse.Object.extend(parseClass));
    //query.whereGreaterThan('modified-at', sinceToken);
    return new Promise(function (resolve, reject) {
      parseQuery.find({
        success: function (objArr) {
          resolve(objArr);
        },
        error: function(result, err) {
          reject(result,err);
        }
      });

    });
  },
  query: function (store, type, queryParams) {
    let parseClass = type.parseClass || type.modelName;
    let parseQuery = new Parse.Query(Parse.Object.extend(parseClass));

    //attach query params here

    return new Promise(function (resolve, reject) {
      parseQuery.find({
        success: function (objArr) {
          resolve(objArr);
        },
        error: function(result, err) {
          reject(result,err);
        }
      });

    });
  }

});

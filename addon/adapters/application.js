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

    if (queryParams.equalTo) {
      for (let col in queryParams.equalTo) {
        parseQuery.equalTo(col, queryParams.equalTo[col]);
      }
    }
    if (queryParams.notEqualTo) {
      for (let col in queryParams.notEqualTo) {
        parseQuery.equalTo(col, queryParams.notEqualTo[col]);
      }
    }
    if (queryParams.lessThan) {
      for (let col in queryParams.lessThan) {
        parseQuery.equalTo(col, queryParams.lessThan[col]);
      }
    }
    if (queryParams.greaterThan) {
      for (let col in queryParams.greaterThan) {
        parseQuery.equalTo(col, queryParams.greaterThan[col]);
      }
    }
    if (queryParams.lessThanOrEqualTo) {
      for (let col in queryParams.lessThanOrEqualTo) {
        parseQuery.equalTo(col, queryParams.lessThanOrEqualTo[col]);
      }
    }
    if (queryParams.greaterThanOrEqualTo) {
      for (let col in queryParams.greaterThanOrEqualTo) {
        parseQuery.equalTo(col, queryParams.greaterThanOrEqualTo[col]);
      }
    }
    if (queryParams.ascending) {
      if (queryParams.ascending instanceof Array) {
        parseQuery.ascending(...queryParams.ascending);
      } else {
        parseQuery.ascending(queryParams.ascending);
      }
    }
    if (queryParams.descending) {
      if (queryParams.descending instanceof Array) {
        parseQuery.descending(...queryParams.descending);
      } else {
        parseQuery.descending(queryParams.descending);
      }
    }

    //attach more query params here

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

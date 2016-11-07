import DS from 'ember-data';

function parsePayloadToModel(payload) {
  let pid = payload.id;
  payload = payload.toJSON();
  payload.id = pid;
  return payload;
}

export default DS.JSONSerializer.extend({
  primaryKey: 'objectId',
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {

    return this._super(store, primaryModelClass, parsePayloadToModel(payload));
  },
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    payload.forEach((item, index, arr) => {
      arr[index] = parsePayloadToModel(item);
    });
    return this._super(store, primaryModelClass, payload);
  }
});

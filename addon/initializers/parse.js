export function initialize(app) {
  // application.inject('route', 'foo', 'service:foo');
  console.log(app)
  Parse.initialize(
    app.Parse.appId,
    app.Parse.jsApiId
  );
  Parse.serverURL = app.Parse.url;
}

export default {
  name: 'parse',
  initialize
};

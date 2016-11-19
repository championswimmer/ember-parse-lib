# ember-parse-lib

[![NPM](https://nodei.co/npm/ember-parse-lib.png?downloads=true&stars=true)](https://nodei.co/npm/ember-parse-lib/)
[![Ember Observer Score](https://emberobserver.com/badges/ember-parse-lib.svg)](https://emberobserver.com/addons/ember-parse-lib)

An Ember addon to interact with Parse datastore.   
This supports Ember API **v2.x** and above (built using Ember v2.8)   
Also we have full support for custom Parse URLs including _[back4app](http://back4app.com)_ or _[sashido](http://sashido.io)_
or your very own Parse installation on your own DO/AWS/GC/Azure box. 

## Usage

### Installation

Install the addon  
```shell
ember install ember-parse-lib
```

Install `parse@1.9.2` via Bower as frontend dependency
```shell
bower install parse@^1.9.2
```

In your `config/environment.js` add this to your ENV.APP 
```javascript
var ENV = {
  ...,
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      Parse: {
        url: 'https://parseapi.back4app.com',
        appId: 'G9h2udnUz5z2oVT7OAFNNSkcQKkORl6Sb2bePZ7B',
        jsApiId: 'MaVeTMJ0uubSRBADREgXy9UY98uPcxDRMEurTiyf'
      }
    }
  };
```

### Saving Data

Create a model of your required class 
```shell
ember g model fruit
```

You can make the model whichever way you want to, just like any
simple Ember model
```javascript
import DS from 'ember-data';

export default DS.Model.extend({
  color: DS.attr('string'),
  taste: DS.attr('string')
});

```
The `modelName` (which is just the file name of the
model, all lowercase and dashified) of the model is
used as class name in Parse.

If you want to have a custom class name (for eg,
to have a capitalized name), reopen the class
and add `parseClass`

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
  color: DS.attr('string'),
  taste: DS.attr('string')
}).reopenClass({
  parseClass: 'Fruit'
});

```


Save the data as you'd do with any Ember model

```javascript
this.store.createRecord('fruit', {
  color: 'red',
  taste: 'sour'
}).save().then(function(savedObj) {
  console.log('Saved object with key ' + savedObj.id);
})
```
### Fetching Data 

To find all records in a class

```javascript
this.store.findAll('fruits').then(function (fruits) {
    console.log(fruits);
    //Eat them fruits here ;)
  });
```

To find a particular entity by given id

```javascript
    this.store.findRecord('fruits', '2D7dKQbCGZ').then(function(fruit) {
      console.log(fruit);
    });

```
Here we are fetching fruit with id = 2D7dKQbCGZ.

#### Queries 
**ember-parse-lib** supports query constraints too. 
For example to find fruits in ascending order of their colour - 
```javascript
      this.store.query('fruits', {ascending: "colour"}).then(function (fruits) {
        console.log(fruits);
      });

```

And to find a particular username
```javascript
      this.store.query('parseuser', {equalTo: {'username': username}}).then(function(users) {
        console.log(users);
      });

```

An example structure of your query filter object is this - 
```javascript
{
        equalTo: {
          city: "Delhi",
          country: "India"
        },
        notEqualTo: {
          gender: "male"
        },
        lessThan: {
          age: 40,
        },
        lessThanOrEqualTo: {
          hasCars: 4
        },
        greaterThan: {
          age: 20
        },
        greaterThanOrEqualTo: {
          kids: 1
        },
        ascending : ["age", "name"],
        descending: "city"
      }
```
This would find out people in Delhi, India, who are not males,
between the age of 20 and 40, having less than 4 cars and more than
1 kid. It'll show up in ascending order of age, and within that, in order 
of name. Ties will be broken in descending order of city.

### Signing up user
Sign up a user with username and password like this - 

```javascript
      let user = this.store.createRecord("parseuser");
      user.username = "username";
      user.password = "password";
      user.signUp().then((obj) => {
        console.log("Signed up user, and id of new user = " + obj.id);
      });
```

### Logging in a user
Log in a user with username and password, or existing user object
```javascript
      let user = this.store.createRecord("parseuser");
      user.username = username;
      user.password = password;
      user.logIn().then((obj) => {
        console.log("Parse object of user = " + obj);
      });
      obj.set("moredata", "somevalue");
      obj.save();

```

## Contribution

Please read up on Ember's [extending guidelines](https://ember-cli.com/extending/) to get an idea of how
Ember addons are structured.

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

**NOTE: I have not actually written any tests and 
writing tests for everything is something that needs to be 
done and is on high priority**

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

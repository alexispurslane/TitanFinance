import DS from 'ember-data';

var a = DS.attr;

export default DS.Model.extend({
  symbol: a('string'),
  name: a('string'),
  uid: a('string'),
  number: a('number'),
  worth:  a('number'),
  cost:   a('number'),
  th: a('number')
});

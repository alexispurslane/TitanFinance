import DS from 'ember-data';

var a = DS.attr;

export default DS.Model.extend({
  symbol: a('string'),
  number: a('number'),
  worth:  a('number'),
  cost:   a('number')
});

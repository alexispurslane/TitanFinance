import DS from 'ember-data';

var a = DS.attr;

export default DS.Model.extend({
  symbol: a('string'),
  name:   a('string'),
  cost:   a('number')
});

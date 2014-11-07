import DS from 'ember-data';

var a = DS.attr;

export default DS.Model.extend({
  'ADR TSO': a('string'),
  'IPOyear': a('string'),
  'LastSale': a('number'),
  'MarketCap': a('number'),
  'Name': a('string'),
  'Sector': a('string'),
  'Summary Quote': a('string'),
  'Symbol': a('string'),
  'industry': a('string')
});

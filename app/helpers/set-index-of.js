import Ember from 'ember';

function setIndexOf(array, index) {
  return array[index];
}

export { setIndexOf };

export default Ember.Handlebars.makeBoundHelper(setIndexOf);

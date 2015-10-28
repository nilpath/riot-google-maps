import {assign} from 'es6-object-assign';

export default function StateMixin() {
  
  function storeState() {
    this.prevOpts = assign({}, this.opts);
  }
  
  this.init = function() {
    this.prevOpts = {};
    this.on('updated', storeState.bind(this));
  };
  
}


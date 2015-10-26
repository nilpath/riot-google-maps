

export default function StateMixin() {
  
  this.init = function() {
    this.prevOpts = {};
    this.on('updated', storeState.bind(this));
  };
  
}

function storeState() {
  this.tagState = Object.assign({}, this.opts);
}
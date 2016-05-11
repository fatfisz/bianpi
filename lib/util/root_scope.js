import Scope from './scope.js';


export default class RootScope extends Scope {
  constructor() {
    super(null);

    this.allSymbols = new Set();
  }
}

import Scope from './scope.js';


export default class RootScope extends Scope {
  constructor() {
    super(null, true);

    this.errors = new Set();
  }

  addError(error) {
    this.errors.add(error);
  }
}

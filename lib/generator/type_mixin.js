import dedent from 'lib/util/dedent.js';
import { TYPE } from 'lib/util/scope_types.js';


export default function typeGeneratorMixin(Generator) {
  return class extends Generator {
    generateType({ props: { name, parameters, dimensions } }, scope) {
      const {
        id: nameId,
        props: {
          length = 0,
        },
      } = scope.expectAndGet(name, TYPE, { fatal: true });

      const parametersLength = parameters ? parameters.length : 0;

      if (parametersLength !== length) {
        scope.root.addError(
          new Error(dedent`
            '${name.value}' accepts ${length === 0 ? 'no' : length}
            parameter${length === 1 ? '' : 's'}
            but ${parametersLength === 0 ? 'none' : parametersLength}
            ${parametersLength === 1 ? 'was' : 'were'}
            given.
          `)
        );
      }

      let typeCode = nameId;

      if (parameters) {
        const types = parameters
          .map((parameter) => this.generateType(parameter, scope));
        typeCode = `() => ${typeCode}(${types.join(', ')})`;
      }

      if (dimensions) {
        const expressions = dimensions
          .map((expression) => this.generateExpression(expression, scope));
        typeCode = `makeArrayType(${typeCode}, ${expressions.join(', ')})`;
      }

      return typeCode;
    }
  };
}

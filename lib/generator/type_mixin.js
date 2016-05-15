import dedent from 'lib/util/dedent.js';


export default function typeGeneratorMixin(Generator) {
  return class extends Generator {
    generateType({ props: { name, parameters, dimensions } }, scope) {
      if (!scope.has(name.value, 'type')) {
        throw new Error(`Type '${name.value}' is not declared.`);
      }
      const {
        id: nameId,
        props: typeProps,
      } = scope.get(name.value, 'type');

      const parametersLength = parameters ? parameters.length : 0;
      // typeProps can be there, but might be missing `length` - so we're using
      // && and ||
      const expectedLength = typeProps && typeProps.length || 0;

      if (parametersLength !== expectedLength) {
        throw this.getTypeArgumentsMismatchError(
          name.value,
          expectedLength,
          parametersLength
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

    getTypeArgumentsMismatchError(name, length, argsLength) {
      return new Error(dedent`
        ${name} accepts ${length}
        parameter${length === 1 ? '' : 's'}
        but ${argsLength === 0 ? 'none' : argsLength}
        ${argsLength === 1 ? 'was' : 'were'}
        given.
      `);
    }
  };
}

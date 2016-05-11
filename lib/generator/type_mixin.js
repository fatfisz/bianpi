import dedent from 'lib/util/dedent.js';


export default function typeGeneratorMixin(Generator) {
  return class extends Generator {
    generateType({ props: { name, parameters, dimensions } }, scope) {
      if (!scope.has(name.value)) {
        throw new Error(`Type ${name.value} is not declared.`);
      }

      const nameInfo = scope.get(name.value);
      if (!nameInfo.type === 'type') {
        throw new Error(`${name.value} is not a type.`);
      }

      const nameId = nameInfo.id;
      const length = nameInfo.props && nameInfo.props.length || 0;
      let result = nameId;

      if (parameters) {
        if (parameters.length !== length) {
          throw this.getTypeArgumentsMismatchError(
            name.value,
            length,
            parameters.length
          );
        }

        const types = parameters
          .map((parameter) => this.generateType(parameter, scope));
        const signature = this.getSignature(nameId, types);

        const info = scope.root.set(signature, 'type', {
          wrapper: true,
          body: `${result}(${types.join(', ')})`,
        });

        result = info.id;
      } else if (length > 0) {
        throw this.getTypeArgumentsMismatchError(name.value, length, 0);
      }

      // TODO: dimensions
      return result;
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

    getSignature(name, args) {
      const processedArgs = args.map((arg) => `${arg.length}${arg}`);
      return `${name.length}n${name}${args.length}a_${processedArgs.join('')}`;
    }
  };
}

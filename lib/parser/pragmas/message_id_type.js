const defaultMessageIdType = 'uint16';

export default function messageIdTypePragmaMixin(Parser) {
  return class extends Parser {
    constructor(lexerResult) {
      super(lexerResult);

      this.pragmas.set('messageIdType', this.setMessageIdType);
      this.setMessageIdType(defaultMessageIdType);
    }

    setMessageIdType(type) {
      switch (type) {
        case 'int8':
        case 'uint8':
          this.messageIdLength = 2;
          break;
        case 'int16':
        case 'uint16':
          this.messageIdLength = 4;
          break;
        case 'int32':
        case 'uint32':
        case 'float32':
          this.messageIdLength = 8;
          break;
        case 'float64':
          this.messageIdLength = 16;
          break;
        default:
          return false;
      }

      this.messageIdType = type;
    }
  };
}

function evaluate(operands, operators) {
  const exp = makeExp(operands, operators);
  const stream = new Stream(exp);
  const result = {};
  try {
    result.res = evalBinary(stream, 1);
  } catch(e) {
    result.err = e.message;
  }
  return result;
}

function makeExp(operands, operators) {
  const exp = [];
  let index = 0;
  const nOperators = operators.length;
  for (let i = 0; i < operands.length; i++) {
    if (i > 0) {
      exp.push(operators[index++ % nOperators]);
    }
    exp.push(operands[i]);
  }
  return exp;
}

class Stream {
  constructor(exp) {
    this.exp = exp;
    this.len = exp.length;
    this.pos = 0;
  }
  next() {
    if (this.pos < this.len) {
      this.pos++;
    }
    return this.token();
  }
  lookahead() {
    return this.exp[this.pos + 1];
  }
  token() {
    return this.exp[this.pos];
  }
}

function evalBinary(stream, prec1) {
  let lhs = evalUnary(stream);
  for (let prec = precedence(stream.token()); prec >= prec1; prec--) {
    while (precedence(stream.token()) == prec) {
      const op = stream.token();
      stream.next();
      const rhs = evalBinary(stream, prec+1)
      switch (op) {
        case '+':
          lhs += rhs;
          break;
        case '-':
          lhs -= rhs;
          break;
        case '*':
          lhs *= rhs;
          break;
        case '/':
          if (rhs === 0) {
            throw new Error('Division by zero');
          }
          lhs /= rhs;
          break;
        default:
          throw new Error(`Unknown operator ${op}`);
      }
    }
  }
  return lhs;
}

function evalUnary(stream) {
  let lhs = stream.token();
  stream.next();
  return lhs;
}

function precedence(token) {
  if (token === '*' || token === '/') {
    return 2;
  }
  if (token === '-' || token === '+') {
    return 1;
  }
  return 0;
}

export default evaluate;
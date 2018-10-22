function evaluate(operands, operators) {
  const exp = makeExp(operands, operators);
  const stream = new Stream(exp);
  const result = {};
  try {
    result.res = evalSum(stream);
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

function evalSum(stream) {
  let lhs = evalProduct(stream);
  while(['+', '-'].indexOf(stream.lookahead()) !== -1 ) {
    const op = stream.next();
    stream.next();
    const rhs = evalProduct(stream);
    if (op === '+') {
      lhs += rhs;
    } else {
      lhs -= rhs;
    }
  }
  return lhs;
}

function evalProduct(stream) {
  let lhs = stream.token();
  if (['*', '/'].indexOf(stream.lookahead()) !== -1 ) {
    const op = stream.next();
    stream.next();
    const rhs = evalProduct(stream);
    if (op == '*') {
      lhs *= rhs;
    } else {
      if (rhs === 0) {
        throw new Error('Division by zero');
      }
      lhs /= rhs;
    }
  }
  return lhs;
}

export default evaluate;
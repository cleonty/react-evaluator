function evaluate(operands, operators) {
  let exp = makeExp(operands, operators);
  const result = {};
  try {
    exp = evalMulAndDiv(exp);
    exp = evalAddAndSub(exp);
    result.res = exp[0];
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

function evalMulAndDiv(exp) {
  const result = [];
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === '*') {
      result[result.length - 1] *= exp[i + 1];
      i++;
    } else if (exp[i] === '/') {
      if (exp[i + 1] === 0) {
        throw new Error('Division by zero');
      }
      result[result.length - 1] /= exp[i + 1];
      i++;
    } else {
      result.push(exp[i]);
    }
  }
  return result;
}

function evalAddAndSub(exp) {
  const result = [];
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === '+') {
      result[result.length - 1] += exp[i + 1];
      i++;
    } else if (exp[i] === '-') {
      result[result.length - 1] -= exp[i + 1];
      i++;
    } else {
      result.push(exp[i]);
    }
  }
  return result;
}

export default evaluate;
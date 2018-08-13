import evaluate from './Expression';

it('it should eval correctly', () => {
  const tests = [
    {
      operands: [1, 2, 3],
      operators: '+*',
      expected: {
        res: 7
      }
    },
    {
      operands: [1, 2, -3],
      operators: '+-*',
      expected: {
        res: 6
      }
    },
    {
      operands: [1, 2, 3, 4, 5, 16],
      operators: '+-*',
      expected: {
        res: -20
      }
    }
  ];

  for (let test of tests) {
    expect(evaluate(test.operands, test.operators)).toEqual(test.expected);
  }
});

it('it should return error', () => {
  const tests = [
    {
      operands: [1, 0],
      operators: '/',
      expected: {
        err: 'Division by zero'
      }
    }
  ];

  for (let test of tests) {
    expect(evaluate(test.operands, test.operators)).toEqual(test.expected);
  }
});

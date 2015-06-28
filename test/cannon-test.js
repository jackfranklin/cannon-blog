import expect from 'expect.js';

import cannon from '../src/cannon';

describe('The cannon export', () => {
  const expected = [
    'init', 'pages', 'render', 'expose',
    'posts', 'layouts', 'htmlDocument', 'data'
  ].sort();

  it('exports the right things', () => {
    expect(Object.keys(cannon).sort()).to.eql(expected);
    expected.forEach((exp) => expect(exp).to.not.be(undefined));
  });
});

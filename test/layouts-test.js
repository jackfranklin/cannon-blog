import expect from 'expect.js';
import path from 'path';

import layouts from '../src/layouts';

describe('Cannon layouts', () => {
  const next = () => {};

  let res;
  beforeEach(() => {
    res = { locals: { cannon: {} } };
  });

  it('adds the layouts to cannon locals', () => {
    layouts({ default: 'foo.js' })({}, res, next);
    expect(res.locals.cannon.layouts).to.eql([
      {
        name: 'default',
        path: path.join(process.cwd(), 'foo.js')
      }
    ]);
  });
});

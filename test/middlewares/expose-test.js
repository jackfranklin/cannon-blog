import expect from 'expect.js';
import { Double } from 'doubler';

import expose from '../../src/middlewares/expose';

describe('Cannon Expose', () => {
  const next = () => {};

  let res;
  let json;
  beforeEach(() => {
    json = new Double({ json: () => {} }).json;

    res = {
      locals: { cannon: {} },
      json
    }
  });

  it('renders cannon to JSON if the path matches', () => {
    expose({})({ path: '/__cannon/' }, res, () => {});
    expect(json.callCount).to.eql(1);
  });

  it('calls next if the path is anything else', function() {
    let { next } = new Double({ next: () => {} });

    expose({})({ path: '/foo' }, res, next);
    expect(next.callCount).to.eql(1);
  });
});

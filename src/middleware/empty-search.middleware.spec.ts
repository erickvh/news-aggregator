import { EmptySearchMiddleware } from './empty-search.middleware';

describe('EmptySearchMiddleware', () => {
  it('should be defined', () => {
    expect(new EmptySearchMiddleware()).toBeDefined();
  });
});

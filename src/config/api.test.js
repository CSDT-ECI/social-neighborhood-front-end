describe('API config', () => {
  const original = globalThis.$dir;
  afterEach(() => {
    globalThis.$dir = original;
    jest.resetModules();
  });

  test('uses globalThis.$dir when provided', () => {
    globalThis.$dir = 'http://example.test/';
    // re-require module to pick up globalThis change
    const api = require('./api').default;
    expect(api).toBe('http://example.test/');
  });

  test('falls back to provided default when not set', () => {
    globalThis.$dir = undefined;
    const api = require('./api').default;
    expect(api).toBe('https://socialneighborhood.herokuapp.com');
  });
});

import * as API from '../public/src/config/apiData';

describe('API Key Verification', () => {
  test('Verify valid  api key', () => {
    expect(API.fetchApiKey()).toBe('e5LqfA7O3UvhGQifFuij');
  });

  test('Verify invalid api key', () => {
    expect(API.fetchApiKey()).not.toBe('e5LqfA7O3uxcQifFuij');
  });
});



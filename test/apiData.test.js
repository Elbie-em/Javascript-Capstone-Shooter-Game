import * as API from '../public/src/config/apiData';

describe('API Key Verification', () => {
  test('Verify valid  api key', () => {
    expect(API.fetchApiKey()).toBe('e5LqfA7O3UvhGQifFuij');
  });

  test('Verify invalid api key', () => {
    expect(API.fetchApiKey()).not.toBe('e5LqfA7O3uxcQifFuij');
  });
});

describe('API Url verification', () => {
  test('Verify valid API url', () => {
    expect(API.fetchApiUrl()).toBe('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/');
  });

  test('Verify invalid API url', () => {
    expect(API.fetchApiUrl()).not.toBe('https://us-central1-js-capstone-backend.cloudfunctions.net/api/game');
  });
});

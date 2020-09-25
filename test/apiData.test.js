import * as API from '../public/src/config/apiData'

test("Verify API key" ,() => {
  expect(API.fetchApiKey()).toBe('e5LqfA7O3UvhGQifFuij');
});

test("Verify API url", () => {
  expect(API.fetchApiUrl()).toBe('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/');
});
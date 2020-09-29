import * as ScoreProcessor from '../public/src/config/scoreProcessor';

const scoreData = {
  result: [
    {
      user: 'example',
      score: 256,
    },
  ],
};

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(scoreData),
}));

describe('Testing the score API', () => {
  test('getting results from API', () => {
    expect.assertions(1);

    return ScoreProcessor.getScores()
      .then(data => expect(data).toEqual(data));
  });
});
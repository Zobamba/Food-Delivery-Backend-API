module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.(ts|tsx|js)'],
};

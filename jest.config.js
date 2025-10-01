module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

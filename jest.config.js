/* eslint-disable */
module.exports = {
  browser: true,
  globals: {
    NODE_ENV: 'test',
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!**/node_modules/**'],
  coverageReporters: ['html', 'text-summary'],
}

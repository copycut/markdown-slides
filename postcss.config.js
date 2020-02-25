module.exports = {
  plugins: [
    require('precss')(),
    require('autoprefixer')(),
    require('postcss-color-mod-function')(),
  ],
}

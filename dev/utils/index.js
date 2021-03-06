var path = require('path')

// amd 异步模块引入配置
var AMD = [
  {test: 'jquery/dist/jquery.min', options: '$'},
  {test: 'jquery-ui', options: '$widget'},
  {test: 'bootstrap-datetime-picker/js/bootstrap-datetimepicker.min'}
]

module.exports.resolve = function () {
  return path.resolve(__dirname, '../../', ...arguments)
}

module.exports.isProd = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production'

module.exports.AmdGenerateLoader = function () {
  return AMD.map(function (item) {
    return {
      test: require.resolve(item.test),
      use: [
        {
          loader: 'export-loader',
          options: item.options
        },
        'script-loader'
      ]
    }
  })
}

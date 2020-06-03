require('babel-register') ({
  'presets': ['env', 'stage-2'],
  'plugins': ['transform-runtime']
})

module.exports = require('./server.js')

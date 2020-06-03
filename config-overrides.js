const { override, addPostcssPlugins, fixBabelImports, addLessLoader } = require('customize-cra')


module.exports = override(
  addLessLoader(),
  addPostcssPlugins([require("postcss-px2rem-exclude")({
    remUnit: 16,
    propList: ['*'],
    exclude: ''
  })]),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  })
)

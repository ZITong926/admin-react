const path = require('path')
const webpack = require('webpack')
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  useEslintRc,
  addWebpackPlugin
} = require('customize-cra')

module.exports = override(
  useEslintRc(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true
    // modifyVars: { '@primary-color': '#e64e14' }
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  )
)

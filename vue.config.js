const path = require('path')
 
const resolve = dir => {
  return path.join(__dirname, dir)
}
 
module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://www.runoob.com/',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@API', resolve('src/api'))
      .set('@C', resolve('src/components'))
      .set('@U', resolve('src/utils'))
      .set('@V', resolve('src/views'))
      .set('@ATS', resolve('src/assets'))
  }
}
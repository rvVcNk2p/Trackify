module.exports = {
  devServer: {
    proxy: 'http://localhost:5000'
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: "@use '@/assets/styles/variables' as *;"
      }
    }
  }
}

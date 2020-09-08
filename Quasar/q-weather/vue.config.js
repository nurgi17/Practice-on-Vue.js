const fs = require('fs')
module.exports = {
  devServer: {
    proxy: 'https://samples.openweathermap.org/',
    public: 'https://localhost:8080/'
  }
}

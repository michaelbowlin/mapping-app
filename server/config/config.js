var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/mappingApp',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://mapping:pas$w0rd@ds034878.mongolab.com:34878/mapping-app',
    port: process.env.PORT || 80
  }
}
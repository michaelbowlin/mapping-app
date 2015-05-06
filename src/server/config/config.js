var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    //db: 'mongodb://localhost/multivision',
    db: 'mongodb://mapping:pas$w0rd@ds031922.mongolab.com:31922/mapping-app',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://mapping:pas$w0rd@ds031922.mongolab.com:31922/mapping-app',
    port: process.env.PORT || 80
  }
}
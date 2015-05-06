var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var app = express();

var config = require('./src/server/config/config')[env];

require('./src/server/config/express')(app, config);

require('./src/server/config/mongoose')(config);

require('./src/server/config/passport')();

require('./src/server/config/routes')(app);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
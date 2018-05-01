'use strict';

var SwaggerConnect = require('swagger-connect');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var app = require('connect')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerConnect.create(config, function(err, swaggerConnect) {
  if (err) { throw err; }

  // install middleware
  swaggerConnect.register(app);
  app.use(SwaggerUi(swaggerConnect.runner.swagger));
  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerConnect.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

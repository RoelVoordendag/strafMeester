/**
 * Import vendor modules
 */
 const {Runtime, Server} = require('@neobeach/core');
 
 /**
  * Import own modules
  */
 const Webhook = require('./routers/Webhook');
 const Github = require('./routers/Github');
 const Template = require('./routers/Template');

 /**
  * Setup a new Express server
  */
 const server = new Server();

 /**
  * Define global middlewares
  */
 const globalMiddleware = [
 ];
 
 /**
  * Define custom routers
  */
 const routers = [
    Webhook,
    Github,
    Template
 ];

// When server is started up start up cron for getting servers
function startIntervalFunctions () {
    const fetch = require('node-fetch');

    fetch('http://0.0.0.0:3000/github/builds');
}
 
 /**
  * Create a runtime/sandbox to start the server in
  */
 Runtime(() => {
     server.setParameter('view engine', 'ejs');
     server.setParameter('views', `${__dirname}/templates`);
     server.loadStatic(`${__dirname}/public`);
     server.includeDefaultSecurityHeaders();
     server.includeDefaultBodyParsers();
     server.loadRouters(routers);
     server.run();
     startIntervalFunctions();
 });
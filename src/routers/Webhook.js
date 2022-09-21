
   
/**
 * Import vendor modules
 */
 const {Router} = require('@neobeach/core');

 /**
  * Import own modules
  */
 const WebhookController = require('../controllers/WebhookController');
 
 /**
  * Initialize new Router
  */
 const router = new Router('Webhook');
 
 /**
  * Add routes to router
  */
 router.add('/webhook', WebhookController);
 
 /**
  * Exports the Api router
  */
 module.exports = router;
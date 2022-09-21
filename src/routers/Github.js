
   
/**
 * Import vendor modules
 */
 const {Router} = require('@neobeach/core');

 /**
  * Import own modules
  */
 const GithubController = require('../controllers/GithubController');
 
 /**
  * Initialize new Router
  */
 const router = new Router('Github');
 
 /**
  * Add routes to router
  */
 router.add('/github', GithubController);
 
 /**
  * Exports the Api router
  */
 module.exports = router;
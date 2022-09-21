
   
/**
 * Import vendor modules
 */
 const {Router} = require('@neobeach/core');

 /**
  * Import own modules
  */
 const TemplateController = require('../controllers/TemplateController');
 const ScoreController = require('../controllers/ScoreController');
 
 /**
  * Initialize new Router
  */
 const router = new Router('Template');
 
 /**
  * Add routes to router
  */
 router.add('/', TemplateController);
 router.add('/edit/score', ScoreController);
 
 /**
  * Exports the Api router
  */
 module.exports = router;
/**
 * Import vendor modules
 */
 const {Controller, config} = require('@neobeach/core');

/**
 * Import utils
 */
const supabase = require('../utils/supabase');

 /**
  * Initialize new Controller
  */
 const controller = new Controller('TemplateController');
 
 /**
  * Change scrore
  */
 controller.post('/', [], async (req, res) => {  
    const { addStraf, checkUser } = supabase(config);

    // Check if user value is filled and if user exist
    const user = req.body.user && checkUser(req.body.user) ? req.body.user : res.res.redirect('/');

    // Check to add or subtract
    req.body.type === "add" ?  addStraf(user, 1) : addStraf(user, -1);

    res.res.redirect('/');
});

  /**
   * Exports the IndexController
   */
  module.exports = controller;
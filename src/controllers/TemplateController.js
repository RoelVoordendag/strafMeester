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
  * Add routes to controller
  * 
  * Type: Homepage
  */
 controller.get('/', [], async (req, res) => {  
    const {getUsers} = await supabase(config);

    res.res.render('homepage', {
       name: "Straf Meester Dashboard",
       edit: false,
       users: await getUsers()
    });
 });


 /**
  * Homepage with edit screen in it
  */
 controller.post('/:edit', [], async (req, res) => {  
   const { getUsers, getUser } = supabase(config);

   res.res.render('homepage', {
      name: "Straf Meester Dashboard",
      users: await getUsers(),
      edit: true,
      editUser: await getUser(req.body.userId)
   });
});

  /**
   * Exports the IndexController
   */
  module.exports = controller;
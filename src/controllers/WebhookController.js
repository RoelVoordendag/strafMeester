/**
 * Import vendor modules
 */
const dlv = require('dlv');
const {Controller, config, Logger} = require('@neobeach/core');

/**
 * Import utils
 */
const supaUtil = require('../utils/supabase');
const slack = require('../utils/slack');
/**
 * Initialize new Controller
 */
const controller = new Controller('IndexController');

/**
 * Add routes to controller
 */
controller.post('/ship', [], async (req, res) => {
    const { checkUser, addStraf } = supaUtil(config);

    Logger.debug("DEBUG POST INFORMATION", req.body);

    // Get vars from ship webhook body
    const type = dlv(req, 'body.type', false);
    const username = dlv(req, 'body.username', false);

    Logger.info(`[SHIP] type is ${type}`);
    Logger.info(`[SHIP] username is ${username}`);

    // Check if it was a failure or a restore
    if(type && (type.includes('attempt') || type.includes('restore'))){
        // Check if user is registered
        const user = await checkUser(username);

        Logger.info(`[SHIP] User is ${user}`);

        // Add 1 straf to the user + send to slack
        if(user.email) {
            Logger.info(`[SHIP] Added one straf to user ${user.name}`);
            
            const result = await addStraf(username, 1);
            
            if(result) {
                slack(config, user);
            }
        }
    }

    res.json(1000, {});
    return;
});
 
 /**
  * Exports the IndexController
  */
 module.exports = controller;
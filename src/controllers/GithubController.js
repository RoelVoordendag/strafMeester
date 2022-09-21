/**
 * Import vendor modules
 */
 const {Controller, config, Logger} = require('@neobeach/core');
 
 /**
  * Import utils
  */
 const githubUtil = require('../utils/github');
const slack = require('../utils/slack');
 const supaUtil = require('../utils/supabase');
 /**
  * Initialize new Controller
  */
 const controller = new Controller('GithubController');
 
 /**
  * Add routes to controller
  */
 controller.get('/builds', [], async (req, res) => {
   const { checkUserGithub, addStraf } = supaUtil(config);

   Logger.info(`[GITHUB WORKFLOW] Started checking github workflows`)

   const { getRepos, getFailedRuns } = githubUtil(config.github);

   setInterval(async () => {
      const repos = await getRepos(config.github.owner);
   
      for (let i = 0; i < repos.length; i++) {
         Logger.info(`[GITHUB WORKFLOW] Checking repo ${repos[i].name}`);

         const runs = await getFailedRuns(repos[i].name, config.github.owner);

         // Check if there was a deployment today
         if(runs.total_count && runs.total_count > 0){
            Logger.info(`[GITHUB WORKFLOW] Found failed run in repo ${repos[i].name}`);

            for (let j = 0; j < runs.workflow_runs.length; j++) {

               const user = await checkUserGithub(runs.workflow_runs[j].actor.login);

               // Check if user exit
               if(user.email){
                  Logger.info(`[GITHUB WORKFLOW] Adding one straf to user ${runs.workflow_runs[j].actor.login}`);

                  addStraf(user.email, 1);
                  slack(config, user);
               }else{
                  Logger.info(`[GITHUB WORKFLOW] User ${runs.workflow_runs[j].actor.login} is not know inside db`)
               }
            }
         }
      }
   }, 46800000);

    res.json(1000, {});
    return;
 });
  
  /**
   * Exports the IndexController
   */
  module.exports = controller;
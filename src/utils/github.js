/**
 * Import modules
 */
const fetch = require('node-fetch');


module.exports = (config) => {
    return {
        // Collect repo based on given repo 
        getRepos: async () => {
            const response = await fetch(`${config.url}/orgs/${config.owner}/repos?per_page=100`, {
                "headers": {
                    "Authorization": `Bearer ${config.token}`
                }
            });

            const repos = await response.json();

            return Array.isArray(repos) ? repos : [];
        },

        // Check run based on given repo name and github owner
        getFailedRuns: async (repo, owner) => {
            const currentDate = new Date();

            const result = currentDate.toLocaleDateString("zh-Hans-CN", { 
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }).replaceAll(/\//ig, '-');

            const response = await fetch(`${config.url}/repos/${owner}/${repo}/actions/runs?created=${result}&status=failure`, {
                "headers": {
                    "Authorization": `Bearer ${config.token}`
                }
            });

            const actions = await response.json();

            return actions;
        }   
    }
}
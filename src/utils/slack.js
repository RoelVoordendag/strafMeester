/**
 * Import modules
 */
const fetch = require('node-fetch');

/**
 * 
 * @see https://api.slack.com/messaging/composing/layouts#attachments
 * @see https://slack.com/help/articles/115005265063-Incoming-webhooks-for-Slack#message-options
 * 
 * @param {Object} config
 * @param {Object} user 
 * 
 */
module.exports = async (config, user) => {
    const responseBody = await fetch(config.slack.messageUrl, {
        method: 'post',
        body: JSON.stringify({
            "fallback": `StrafMeester strikes again there has been 1 straf added to ${user.name}`,
            "text": `StrafMeester strikes again there has been 1 straf added to ${user.name}`
        }),
    });

    const response = await responseBody.json();

    if (!response.status.code < 300) { // Failure
        console.error(`[SLACK] Something went wrong with slack Error: ${JSON.stringify(response)}`)
    }else{
        return true;
    }
}
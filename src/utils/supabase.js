const { createClient } = require('@supabase/supabase-js');

module.exports = (config) => {
    const client = createClient(config.supabase.url, config.supabase.apiKey);

    return {
        checkUser: async (email) => {
            const { error, count, data } = await client.from('users').select().eq('email', email).single();

            return !error ? data : false;
        },

        checkUserGithub: async (githubUsername) => {
            const { error, data } = await client.from('users').select().eq('github_username', githubUsername).single();

            return !error ? data : false;
        },

        // add Straf based on function in supabase
        addStraf: async (email, amount) => {
            const error = await client.rpc('plus_straf', {"user_email": email, "amount": amount});
            
            return error !== null;
        },

        // Get users sorted on amount 
        getUsers: async () => {
            const { error, data } = await client.from('users').select().order('straf', { ascending: false });

            return !error ? data : [];
        },

        getUser: async (userId) => {
            const { error, data } = await client.from('users').select().eq('id', userId).single();

            return !error ? data : {}
        }
    }
}
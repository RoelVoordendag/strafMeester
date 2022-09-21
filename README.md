# straf-meester
Application to track the mistakes you and/or collegas made inside your organistation. 

# What is strafMeester

StrafMeester is an application build to track build mistakes inside your organisation and deployments failures inside [Ship](https://github.com/glenndehaan/ship). 
It is build on top of the [Neabeach](https://github.com/neobeach/) core. It collects the data of Github build actions a by cron written inside Neobeach. There is a webhook connected connection with Ship and Strafmeester. We filter out the false deployments and add a straf to the person. 

The DB behind Strafmeester is [Supabase](https://supabase.com/) the reason for it is that I wanted to try this open source concept. I wanted to try how it is to work with an inside SQL editor. 

# Config setup

## Docker setup

With the docker-compose file mentioned inside the project it should not be a problem to run the project inside your docker swarm.
Just run: 
```text
docker-compose up
```

and everything should work correctly.

## Config structure

Create an `config.json` inside of the `src/config` folder. Follow the structure mentioned below and fill in your keys plus Slack webhook url.

```json
{
    "supabase": {
        "url": "supabase_url",
        "apiKey": "supabase_apiKey"
    },
    "slack": {
        "messageUrl": "slack_url"
    },
    "github": {
        "token": "token",
        "owner": "organistion_name",
        "url": "https://api.github.com"
    }
}
```

## Development usage

How to get the project running

```text
npm ci
npm run dev
```
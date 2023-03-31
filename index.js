const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require("./config.json");
const loadPluginFiles = require("./loadFiles/loadFiles");

const client = new Client({ intents: [GatewayIntentBits.Guilds ]});

loadPluginFiles(client);

client.login(token);

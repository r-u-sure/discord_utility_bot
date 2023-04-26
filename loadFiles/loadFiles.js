const path = require('node:path');
const { Collection } = require('discord.js');
const { getEventFilePaths, getCommandFilePaths, getPluginFolderNames, getPluginFoldersPath } = require('./getUtilityFuntion');

const loadPluginFiles = client => {
    const pluginFoldersPath = getPluginFoldersPath(); 
    if (pluginFoldersPath === null) {
        console.log(`[WARNING] plugins 폴더를 찾을 수 없습니다.`);
        return;
    }

    const pluginFolderNames = getPluginFolderNames(pluginFoldersPath);

    for (const pluginName of pluginFolderNames) {
        console.log(`[SETUP] =====\t${pluginName} plugin 로드중\t=====`);
        const pluginPath = path.join(pluginFoldersPath, pluginName);
        loadEventFiles(client, pluginPath);
        loadCommandFiles(client, pluginPath);
        console.log(`[SETUP] =====\t${pluginName} plugin 로드 완료\t=====`);
    }
}

const loadCommandFiles = (client, pluginFolderPath) => {
    client.commands = new Collection();
    const commandFilePaths = getCommandFilePaths(pluginFolderPath);

    if (commandFilePaths === null) {
        console.log(`[WARNING] Command 폴더를 찾을 수 없음`);
        return;
    }

    for (const commandPath of commandFilePaths) {
        const command = require(commandPath);

        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] ${filePath}에 "data" 속성이나 "execute" 속성을 찾을 수 없음`);
        }
    }
};

const loadEventFiles = (client, pluginFolderPath) => {
    const eventFilePaths = getEventFilePaths(pluginFolderPath);
    if (eventFilePaths === null) {
        console.log(`[WARNING] events 폴더를 찾을 수 없음`);
        return;
    }
    for (const filePath of eventFilePaths) {
        const event = require(filePath);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};

module.exports = loadPluginFiles;
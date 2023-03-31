const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const { getPluginFoldersPath, getCommandFilePaths,  getPluginFolderNames } = require('./loadFiles/getUtiliryFuntion');

const commands = [];

function loadCommandsData(){
    const pluginFoldersPath = getPluginFoldersPath();
    if (pluginFoldersPath === null) console.log(`[WARNING] plugins 폴더를 찾을 수 없음`);

    const pluginFolderNames = getPluginFolderNames(pluginFoldersPath);

    for (const folderName of pluginFolderNames) {
        console.log(`[LOAD] ${folderName}플러그인 등록 중`);
        const pluginFolderPath = path.join(pluginFoldersPath, folderName);
        const filePaths = getCommandFilePaths(pluginFolderPath);
        if (filePaths === null) {
            console.log(`[WARNING] ${folderPaths}에서 commands 경로를 찾을 수 없음`);
            return;
        }
        for (const filePath of filePaths) {
            commands.push(require(filePath).data.toJSON());
            console.log(`ADDED ${filePath}`);
        }
        console.log(`[LOAD] ${folderName}플러그인 등록 완료`);
    }
};

loadCommandsData();
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`${commands.length}개 Slash 명령어 등록중`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );
        console.log(`${data.length}개 Slash 명령어 등록 완료`);
    } catch(error) {
        console.error(error);
    }
})();
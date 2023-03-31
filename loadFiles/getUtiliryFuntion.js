const fs = require('node:fs');
const path = require('node:path');

const getPluginFoldersPath = () => {
    const pluginFoldersPath = path.join(__dirname, "..", "plugins");
    if (!fs.existsSync(pluginFoldersPath)) return null;
    return pluginFoldersPath;
}
exports.getPluginFoldersPath = getPluginFoldersPath;

const getPluginFolderNames = (foldersPath) => {
    return fs.readdirSync(foldersPath, { withFileTypes: true }).filter(dir => dir.isDirectory()).map(dir => dir.name);
}
exports.getPluginFolderNames = getPluginFolderNames;

const getJSFilePaths = (filesPath) => {
    return fs.readdirSync(filesPath).filter(file => file.endsWith(".js")).map(fileName => path.join(filesPath, fileName));
}

const getCommandsPath = (pluginFolderPath) => {
    const commandsPath = path.join(pluginFolderPath, "commands");
    if (!fs.existsSync(commandsPath)) return null;
    return commandsPath;
}

const getEventsPath = (pluginFolderPath) => {
    const eventsPath = path.join(pluginFolderPath, "events");
    if (!fs.existsSync(eventsPath)) return null;
    return eventsPath;
}

const getCommandFilePaths = (pluginFolderPath) => {
    const commandsPath = getCommandsPath(pluginFolderPath);
    if (commandsPath === null) return null;
    return getJSFilePaths(commandsPath);
}

exports.getCommandFilePaths = getCommandFilePaths;

const getEventFolderPaths = (pluginFolderPath) => {
    const eventsPath = getEventsPath(pluginFolderPath);
    if (eventsPath === null) return null;
    return fs.readdirSync(eventsPath, { withFileTypes: true }).filter(dir => dir.isDirectory()).map(file => path.join(eventsPath, file.name));
}

const getEventFilePaths = (pluginFolderPath) => {
    const filePaths = [];
    const eventFolderPaths = getEventFolderPaths(pluginFolderPath);
    if (eventFolderPaths === null) return null;
    for (const eventFolderPath of eventFolderPaths) {
        filePaths.push(...getJSFilePaths(eventFolderPath));
    }
    return filePaths;
}

exports.getEventFilePaths = getEventFilePaths;
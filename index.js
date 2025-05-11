const { CreateLogConfig, validateConfig, validatePath } = require("./lib");
const fs = require("node:fs");
const path = require("node:path");

/**
 * @typedef {Object} LogConfig
 * @property {'info'|'warn'|'error'|'debug'} type - The type of log
 * @property {String} [filePath] - ( Optional ) Log contents to a file
 * @property {true|false} [json] - ( Optional ) Parse JSON inputs
 */

class CreateLog {
    #_logConfig;

    /**
     * @param {LogConfig} config 
     * @returns {Function} message - logging function
     */
    constructor(config) {
        if (!validateConfig(config, CreateLogConfig)) {
            throw new Error("Invalid log config");
        }

        this.#_logConfig = config;

        const boundLog = this.log.bind(this);

        boundLog.setConfig = (newConfig) => {
            if (validateConfig(newConfig, CreateLogConfig)) {
                this.#_logConfig = newConfig;
            }
        };

        return boundLog;
    }

    /**
     * Log a value and parse JSON if config json property is {true}
     * @param {String} message - The message of your log
     * @param {Object} json - The json metadata of your log
     * @returns {Null} - Nothing
     */
    log(message, json) {
        if (!message) return;

        const _config = this.#_logConfig;
        const _log_prefix = "[~]";
        const _log_type = `[${_config.type.toUpperCase()}]`;
    
        let fullLog;
    
        if (_config.json && json) {
            fullLog = `${_log_prefix} ${_log_type} ${message}\n${JSON.stringify(json, null, 2)}`;
        } else if (_config.json) {
            fullLog = `${_log_prefix} ${_log_type} ${JSON.stringify(message, null, 2)}`;
        } else {
            fullLog = `${_log_prefix} ${_log_type} ${message}`;
        }
    
        console.log(fullLog);
    
        if (_config.filePath && validatePath(_config.filePath)) {
            fs.appendFileSync(path.resolve(_config.filePath), fullLog + "\n", "utf8");
        }
    }
    
}
require("./lib/process")(CreateLog);      // Process logging ( Node.JS )
module.exports = CreateLog;


const fs_module = require("node:fs");


/** Validate a config based off user input
 * @param {Object} config - User input to validate.
 * @param {Object} schema - Schema definition to validate against.
 * @returns {Boolean} - Validity of user config.
 */
function validateConfig(config, schema) {
    const props = schema.properties || {};  // Properties of config
    const required = schema.required || []; // Required Keys

    /**
     * If key is required and does not have an input,
     * it will use the default provided values.
     */
    for (const key of required) {
        if (!(key in config)) {
            if ('default' in props[key]) {
                config[key] = props[key].default;
                continue;
            } else {
                console.error(`[~] Missing required key '${key}' in 0xlogs config.`);
                return false;
            }
        }
    }

    /**
     * Validating keys existance and type Variable.
     */
    for (const key in config) {

        // Validating key exists
        if (!(key in props)) {
            console.warn(`[~] Warning: Unexpected key '${key}' in 0xlogs config.`);
            continue;
        }

        // Validating key type
        const expectedType = props[key].type;
        if (typeof config[key] !== expectedType) {
            console.error(`[~] Expected '${key}' to be of type '${expectedType}' in 0xlogs config.`);
            return false;
        }
    }

    return true;
}



/** Validate any path
 * @param {String} path - Path to validate.
 * @returns {Boolean} - Validity of path.
 */
function validatePath (path) {
    return fs_module.existsSync(path);
}

module.exports = { validateConfig, validatePath };

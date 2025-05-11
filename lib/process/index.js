module.exports = function (CreateLog) {
const _localLogs = {
    info: new CreateLog({ type: 'info', json: true }),      // Info Logging
    debug: new CreateLog({ type: 'debug', json: true }),    // Debug Logging
    warn: new CreateLog({ type: 'warn', json: true }),      // Warn Logging
    error: new CreateLog({ type: 'error', json: true }),    // Error Logging
  };

process.on(`uncaughtException`, (err) => {
    _localLogs.error(`Uncaught Exception:`, err);
    process.exit(1);
  });
  
  process.on(`unhandledRejection`, (reason, promise) => {
    _localLogs.error(`Unhandled Rejection at: ${promise} \nreason: ${reason}`);
    process.exit(1);
  });
  
  process.on(`warning`, (warning) => {
    _localLogs.warn(`Warning: ${warning}`);
  });
  
  process.on(`SIGINT`, () => {
    _localLogs.info(`Exited Application.`);
    process.exit(0);
  });
  
  process.on(`SIGTERM`, () => {
    _localLogs.info(`Exited Application.`);
    process.exit(0);
  });

  process.on(`exit`, (code) => {
    _localLogs.info(`Process exit event with code: ${code}`);
  });
  
  process.on(`rejectionHandled`, (promise) => {
    _localLogs.warn(`A promise rejection was handled asynchronously: ${promise}`);
  });
  
  process.on(`disconnect`, () => {
    _localLogs.warn(`Parent process disconnected.`);
  });
  
  process.on(`message`, (message) => {
    _localLogs.debug(`Received message from parent process: ${message}`);
  });
  
}
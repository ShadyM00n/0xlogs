# 0xLogs

**0xLogs** is a lightweight and configurable logging utility for Node.js. With built-in JSON support, file-based output, and automatic process event logging, it's designed to help developers quickly integrate clean and structured logs into any application.

---

## 📦 Installation

```bash
npm install 0xlogs
```

---

## 🚀 Features

- ✅ Log levels: `info`, `warn`, `error`, `debug`
- 📝 Optional JSON formatting for structured logs
- 💾 File logging support
- 🧠 Schema validation for config safety
- ⚠️ Automatic logging for:
  - `uncaughtException`
  - `unhandledRejection`
  - `SIGINT`, `SIGTERM`, `exit`
  - Warnings & parent messages

---

## 🛠️ Usage

### Basic Setup

```js
const CreateLog = require("0xlogs");

const log = new CreateLog({
  type: "info",
  filePath: "./logs.txt",
  json: true
});

log("Server started", { port: 3000 });
```

### Update Log Config at Runtime

```js
log.setConfig({
  type: "error",
  json: false
});
```

---

## ⚙️ Config Options

| Option     | Type    | Default    | Description                                                |
|------------|---------|------------|------------------------------------------------------------|
| `type`     | String  | `"info"`   | Log level (`info`, `warn`, `error`, `debug`)              |
| `filePath` | String  | `undefined`| Optional file path to write logs to                       |
| `json`     | Boolean | `true`     | Whether to log messages in JSON format                    |

---

## 📂 Built-in Process Logging

Once `0xlogs` is imported, it auto-handles common Node.js process events and logs them appropriately.

```text
[~] [ERROR] Uncaught Exception: ...
[~] [INFO] Exited Application.
[~] [WARN] A promise rejection was handled asynchronously: ...
```

Monitors the following events:

- `uncaughtException`
- `unhandledRejection`
- `exit`, `SIGINT`, `SIGTERM`
- `warning`, `disconnect`, `message`

---

## 📁 Project Structure (for contributors)


```text
0xlogs/
├── lib/
│   ├── index.js        # Combines validation utilities and config types
│   ├── process/
│   │   ├── index.js    # Handles process-level logging
│   ├── types/
│   │   ├── index.js    # Schema definition
│   ├── functions/
│   │   ├── index.js    # Config & path validation
├── index.js            # Main class (CreateLog)
```

---

## 🔧 Example Use in Larger App

```js
const log = new CreateLog({
  type: "debug",
  json: true
});

log("Connected to database", { host: "localhost" });
```

---

## 📜 License

Licensed under the [MIT License](LICENSE).  
© 2025 ShadyMoon

---

## 💬 Feedback or Issues?

Open an issue on [GitHub Issues](https://github.com/shadymoon/0xlogs/issues) or submit a pull request!

---

## 🌐 Links

- [NPM Package](https://www.npmjs.com/package/0xlogs)
- [GitHub Repo](https://github.com/shadymoon/0xlogs)

// root/ecosystem.config.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'server/.env') }); // Load server/.env

module.exports = {
  apps: [{
    name: "onlyfriends",             // Process name
    script: "./server/server.js",   // Entry point (relative to root)
    cwd: "./server",                // Working directory (where .env lives)
    instances: "max",               // Cluster mode (use all CPU cores)
    autorestart: true,              // Auto-restart if crashes
    watch: false,                   // Disable file watching in prod
    max_memory_restart: "1G",       // Restart if memory > 1GB
    env: {
      NODE_ENV: "development",      // Default environment
    }
  }]
};
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'server/.env') });

module.exports = {
  apps: [{
    name: "onlyfriends",
    cwd: "./server",
    script: "server.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production",
      PORT: 5000
    },
    env_development: {
      NODE_ENV: "development",
      PORT: 5001
    }
  }]
};

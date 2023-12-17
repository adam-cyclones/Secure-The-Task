const os = require("os");

module.exports = {
  apps: [
    {
      name: "api-server",
      script: "./build/index.js",
      env_production: {
        NODE_ENV: "production",
        HOSTNAME: "localhost",
      },
      env: {
        NODE_ENV: "production",
        HOSTNAME: "localhost",
      },
      instances: os.cpus().length,
      exec_mode: "fork",
    },
  ],
};

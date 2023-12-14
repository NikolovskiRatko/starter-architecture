module.exports = {
  apps: [
    {
      name: 'dev',
      exec_mode: 'cluster',
      instances: '3',
      script: './.output/server/index.mjs',
      port: '3030',
      args: 'start',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    }
  ]
};

module.exports = {
  apps: [
    {
      name: 'dev',
      exec_mode: 'cluster',
      instances: '3',
      cwd: '/var/www/html/thestarter.net/current/client/public',
      script: './.output/server/index.mjs',
      port: '3030'
    }
  ]
};

module.exports = {
  apps: [
    {
      name: 'dev',
      exec_mode: 'cluster',
      instances: '3',
      cwd: '/var/www/html/thestarter.net/current/client/public',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start --hostname localhost --port 3030',
      interpreter_args: '',
      merge_logs: true,
      log_date_format: "HH:mm:ss.SSS"
    }
  ]
};

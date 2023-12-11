module.exports = {
  apps: [
    {
      name: 'dev',
      exec_mode: 'cluster',
      instances: '3',
      cwd       : './current',
      script: './.output/server/index.mjs',
      port: '3030'
    }
  ]
};

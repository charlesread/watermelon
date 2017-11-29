module.exports = {
  apps : [
    {
      name      : 'watermelon-8000',
      script    : 'index.js',
      interpreter: '/home/node/.nvm/versions/node/v8.9.1/bin/node'
    }
  ],
  deploy: {
    production: {
      user: 'node',
      host: '174.138.79.67',
      ref: 'origin/master',
      repo: 'git@github.com:charlesread/watermelon.git',
      path: '/home/node/apps/watermelon',
      'pre-deploy': 'echo $USER > user.txt'
    }
  }
};

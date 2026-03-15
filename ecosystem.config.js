module.exports = {
  apps: [
    {
      name: 'nexsentia-frontend',
      script: 'node_modules/.bin/next',
      args: 'start -p 3001',
      cwd: '/root/nexsentia-frontend',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
        NEXT_PUBLIC_API_URL: 'https://backend.nexsentia.com/api/v1',
      },
    },
  ],
};

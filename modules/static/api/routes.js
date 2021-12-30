'use strict';

module.exports = (server) => {
  const handlers = require('./handlers')(server)
  return [
    // Get HTML file
    {
      method: 'GET',
      path: '/',
      config: {
        description: 'Get HTML build file',
        tags: ['static']
      },
      handler: handlers.htmlBuild
    },

    // Get CSS file
    {
      method: 'GET',
      path: '/static/css/{path*}',
      config: {
        description: 'Get CSS static file',
        tags: ['static']
      },
      handler: {
        directory: {
            path: './client/build/static/css'
        }
      }
    },

    // Get JS file
    {
      method: 'GET',
      path: '/static/js/{path*}',
      config: {
        description: 'Get JS static file',
        tags: ['static']
      },
      handler: {
        directory: {
            path: './client/build/static/js'
        }
      }
    },

    // Get Favicon file
    {
      method: 'GET',
      path: '/favicon.ico',
      config: {
        description: 'Get JS static file',
        tags: ['static']
      },
      handler: handlers.getFavicon
    },
  ]
}
'use strict';

module.exports = (server) => {
    
  return {
    /**
     * GET /
     * @param {*} request
     * @param {*} reply
     */
    async htmlBuild (request, reply) {
        return reply.file('./client/build/index.html');
    },
    
    /**
     * GET /favicon.ico
     * @param {*} request
     * @param {*} reply
     */
    async getFavicon (request, reply) {
        return reply.file('./client/build/favicon.ico');
    }
  }
}
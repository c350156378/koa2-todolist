const jwt = require('koa-jwt');

module.exports = (app) => {
    const router = require('koa-router')();

    require('./user')(router);
    require('./list')(router);

    app.use(router.routes())
        .use(router.allowedMethods());
};
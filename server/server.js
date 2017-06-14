const Koa = require('koa');
const mongoose = require('koa-mongoose');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const kcors = require('kcors');
const serve = require('koa-static');
const router = require('koa-router')();
const historyApiFallback = require('koa-history-api-fallback');
const app = new Koa();



//db
app.use(mongoose({
    user: '',
    pass: '',
    host: '127.0.0.1',
    port: 27017,
    database: 'koa2-todolist',
    db: {
        native_parser: true
    },
    server: {
        poolSize: 5
    }
}));

//config,网站名称，端口之类的
app.keys = ['koa2-todolist'];

app.use(kcors())
    .use(logger())
    .use(bodyParser());



require('./routes/index')(app);

app.use(historyApiFallback())
    .use(serve(__dirname + '/dist'));


app.listen(3000, () => { console.log('runnin on port 3000') });
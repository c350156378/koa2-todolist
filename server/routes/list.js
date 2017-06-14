const List = require('../models/listModel');
const jwt = require('jsonwebtoken');

module.exports = (router) => {

    router.get('/api/todolist', async(ctx, next) => {

            try {
                const token = ctx.header.authorization.split(' ')[1];
                const decoded = jwt.verify(token, 'koa2-todolist');
                const todolist = await List.find().exec();
                if (!todolist) {
                    ctx.body = '没有内容';
                } else {
                    ctx.body = {
                        status: 200,
                        data: todolist
                    };
                }
            } catch (error) {
                console.log(error);
            }

        })
        .post('/api/todolist', async(ctx, next) => {


            const todo = {};
            todo.user_id = ctx.request.body.user_id;
            todo.content = ctx.request.body.content;
            todo.status = ctx.request.body.status;

            let todolists = new List(todo);
            todolists.save((err, doc) => {
                if (err) {
                    console.log(err);
                }
            });

            ctx.body = {
                status: true
            };

        })
        .put('/api/todolist', async(ctx, next) => {
            const todolist_id = ctx.request.body.id;
            const status = ctx.request.body.status;
            const result = await List.update({ _id: todolist_id }, { $set: { status: status } }, err => {
                if (err) {
                    console.log(err);
                }

            });
            ctx.body = {
                success: true
            };

        })
        .del('/api/todolist/:id', async(ctx, netx) => {
            const result = await List.deleteOne({ _id: ctx.params.id }, (err) => {
                if (err) {
                    console.log(err);
                }
            });

            ctx.body = {
                success: true
            };
        });

}
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (router) => {

    router.get('/api/user/:id', async(ctx, next) => {
            try {
                const id = ctx.params.id;
                let userInfo = await User.findById(id).exec();
                if (!userInfo) {
                    ctx.body = 'meiyou';
                } else {
                    ctx.body = userInfo;
                    console.log(userInfo);
                }
            } catch (error) {
                console.log(error);
            }
        })
        .post('/api/user', async(ctx, next) => {
            let data = ctx.request.body;
            let userInfo = await User.findOne({ email: data.email });
            if (userInfo != null) {
                if (!bcrypt.compareSync(data.password, bcrypt.hashSync(userInfo.password, 10))) {
                    ctx.body = {
                        success: false,
                        info: '密码错误'
                    }
                } else {
                    const userToken = {
                        email: userInfo.email,
                        id: userInfo._id
                    }
                    const secret = 'koa2-todolist';
                    const token = jwt.sign(userToken, secret);
                    ctx.body = {
                        success: true,
                        token: token,
                        userEmail: userInfo.email,
                        userId: userInfo._id
                    }
                }

            } else {
                ctx.body = {
                    success: false,
                    info: '用户不存在'
                }
            }

        });
};
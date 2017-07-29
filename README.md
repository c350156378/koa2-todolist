# 学习koa2和angular

加入 proxy.config.json 文件
ngx组件改为primeng组件

client 目录下 ng build -op ../server/dist

sever 目录下 npm start

数据库默认存储用户名密码

开命令行，
mongo
use koa2-todolist
db.users.insertOne({email:"123456789@qq.com",password:"123"}) 

个人学习，仅供参考

参考：https://molunerfinn.com/Vue+Koa/

# 关于最佳实践
1. config目录用于配置不同环境
2. models/schema用户定义数据结构
3. controller用于与http交互
4. routes用于定义路由
5. service用于定义逻辑？，可选
6. libs/utils 用于定义通用函数，可选
7. middleware 用于定义中间件，可选
var express =require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var bodyParser=require('body-parser');
var compression = require('compression')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var logger = require('morgan')
var MongoStore =require('connect-mongo')(session);
var serveStatic=require('serve-static')


var dbUrl='mongodb://localhost/saber'
mongoose.connect(dbUrl);

var app = express();


var port = process.env.PORT || 80 ;

app.set('view engine', 'jade');

app.set('port',80);
app.set('views','./app/views/pages');
app.use(compression())
app.use(serveStatic(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser())  //有cookie才能用session,不是express.cookieParser() 直接用cookieParser()
// app.use(multipart());
app.use(session({
    secret:'saber', // 数据库名  mongodb://localhost/saber
    store:new MongoStore({
        url:dbUrl,     //所存的数据库的地址
        collection:'sessions'   //session所存的地方
    }),
    resave:false,
    saveUninitialized:true

})) 

app.locals.moment = require('moment');



// 配置调试信息
var env=process.env.NODE_ENV || 'development'
if('development'===env){   //env是环境变量
    app.set('showStackError',true)   //在屏幕上显示错误
    app.use(logger(':method :url :status'))
    app.locals.preety=true   //代码不会压缩  ！！
    mongoose.set('debug',true)   //在doc显示查询信息
}   




require('./config/routes')(app)

app.listen(port);
console.log("端口在 "+ port);
console.log('服务已经启动，请勿进行其他操作！！')



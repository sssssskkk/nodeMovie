// /**
//  * Created by UU on 2016/6/12.
//  */
//  
'use strict';  
var gulp = require('gulp'),
    minify = require('gulp-minify-css'),  //CSS压缩
    concat = require('gulp-concat'),         // 文件合并
    uglify = require('gulp-uglify'),         //js压缩插件
    rename = require('gulp-rename'), 
    connect=require('gulp-connect'),
    less=require('gulp-less'),
    connect= require('gulp-connect'),        // 重命名
    livereload=require('gulp-livereload'),
    nodemon    = require('gulp-nodemon'),
    mocha    = require('gulp-mocha'),    //单元测试
    del = require('del');                    // 文件删除

  
// 一些文件的路径  
var paths = {  
    public: [  
    'public/js/**/*.js',  
    'public/css/**/*.css' 
    ],  
    server: {  
        index: 'app.js'  
    },
    test:'test/'
};  
  
// nodemon 的配置  
var nodemonConfig = {  
    script : paths.server.index,  
    ignore : [  
        "package.json"
    ],  
    env    : {  
        "NODE_ENV": "development"  
    }  
};  
  
// 使用 nodemone 跑起服务器  
gulp.task('serve', ['livereload'], function() {  
    return nodemon(nodemonConfig);  
});  
  
  
// 当客户端被监听的文件改变时，刷新浏览器  
gulp.task('livereload', function() {  
    livereload.listen();  
    var server = livereload();  
    return gulp.watch(paths.public, function(event) {  
        livereload.changed(event.path);  
    });  
});  

gulp.task('cssmin',function(){
    return gulp.src('public/build/*.css')
        .pipe(minify())
        .pipe(gulp.dest('public/css/css'));
});

gulp.task('less',function(){
    gulp.src('public/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('public/css'))
        .pipe(livereload())
})


gulp.task('jsmin',function(){
    return gulp.src('public/js/*.js')
        // .pipe(concat('main.js'))  //文件合并
        .pipe(uglify())
        .pipe(gulp.dest('public/build/js'));
});


gulp.task('test',function(){
    return gulp.src('test/user/user.js',{read:false})
        .pipe(mocha({reporter: 'nyan'}))
})



gulp.task('compress',['cssmin','jsmin'],function(){
    console.log('compress done');
})


gulp.task('watch',function(){
	console.log('watch')
    livereload.listen();
    gulp.watch('public/less/*.less',['less']);
})

  
// develop 任务， 同时开启 serve、livereload 任务  
gulp.task('develop', ['serve', 'livereload']);  


gulp.task('default', function(){
    gulp.run('develop');
    gulp.watch('./public/less/*.less', function(){
        gulp.run('less');
    });
});


gulp.task('default',['develop','watch'],function(){
    console.log('在80端口成功启动');
});
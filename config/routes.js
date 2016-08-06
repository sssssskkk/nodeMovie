var fs=require('fs');
var path=require('path');
var Index=require('../app/controllers/index')
var User=require('../app/controllers/user')
var Movie=require('../app/controllers/movie')
var Comment=require('../app/controllers/comment')
var Category=require('../app/controllers/category')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var formidable = require('formidable')

module.exports=function(app){

    app.use(function(req,res,next){
        var _user=req.session.user                    
        app.locals.user=_user 
        next()    
    })

    app.get('/test',function(req,res){
        res.render('mIndex',{
            title:'ceshi'
        })
    })

    //index
    app.get('/',Index.index);

    app.get('/movie/random',Index.random)

    app.get('/piaofang',Index.piaofang)

    app.get('/error',Index.error)

    //movie
    app.get('/movie/:id',Movie.detail);

    app.get('/admin/movie/new',User.signinRequired,User.adminRequired, Movie.saveNew);

    app.get('/admin/update/:id',User.signinRequired,User.adminRequired, Movie.update);

    app.post('/admin/movie/new',multipartMiddleware,User.signinRequired,User.adminRequired,Movie.savePoster, Movie.save);

    app.delete('/admin/movie/list',User.signinRequired,User.adminRequired, Movie.del)

    app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list);

    app.post('/movie/jiazai',User.signinRequired, Movie.jiazai)

    app.post('/movie/contentMore', Movie.more)

    app.post('/movie/contentNew', Movie.loadnew)

    app.post('/movie/contentAll', Movie.loadall)

    // user

    app.get('/register',User.register)
    
    app.get('/identify',User.identify)

    app.get('/signin',User.signin)

    app.post('/register',User.postRegister)

    app.post('/usertest',User.usertest)

    app.post('/signin',User.postSignin)

    app.post('/comsignin',User.postComsign)

    app.get('/logout',User.logout)

    app.get('/user/:id',User.signinRequired,User.info)

    app.get('/admin/user/list',User.signinRequired,User.adminRequired, User.userlist);

    app.get('/restpswd',User.signinRequired,User.rest)

    app.post('/user/restsend',User.signinRequired,User.pswdsend)

    //comment

    app.post('/user/comment',User.signinRequired, Comment.save);

    //collect

    app.post('/user/shoucang',User.signinRequired, User.shoucang)

    app.post('/user/prise',User.signinRequired, User.prise)

    //info-update

    app.post('/user/updateinfo',User.signinRequired, User.updateinfo)

    //文件上传
    app.post('/formi',User.signinRequired, User.formi)

    //category

    app.get('/admin/category/new',User.signinRequired,User.adminRequired, Category.new);

    app.post('/admin/category',User.signinRequired,User.adminRequired, Category.save);

    app.get('/admin/category/list',User.signinRequired,User.adminRequired, Category.list);

    //search

    app.get('/results',Index.search)

    app.get('/search',Index.sousuo)

    app.get('/part',Index.part)

    app.get('/date',Index.year)

    app.get('/all',Index.findall)


    


    // ------------mobile
    
    //Index
    app.get('/m/index',Index.mIndex)

    

    // movie

    app.get('/m/movie/:id',Movie.mDetail) 

    app.get('/m/movieMore',Movie.mMovieMore)

    app.get('/m/partMore',Movie.mPartMore)

    app.get('/m/movies',Index.mFindCate)

    app.get('/m/cates',Movie.mMovieCate)

    app.get('/m/date',Index.mYear)

    app.get('/m/year',Movie.year)

    app.get('/m/part',Index.mPart)

    // comment

    app.get('/m/ComMore',Comment.mComMore)

    app.post('/user/mComment',User.signinRequired, Comment.mSave);



    //user
    app.post('/m/user/mShoucang',User.signinRequired, User.mShoucang);

    app.post('/m/user/prise',User.signinRequired, User.mPrise);

    app.get('/m/logout',User.mLogout)

    app.post('/m/user/updateinfo',User.signinRequired, User.mUpdateinfo)

    app.post('/m/register',User.mPostRegister)

    app.get('/m/login',User.mSignin)

    app.get('/m/register',User.mRegister)

    app.post('/m/signin',User.mPostSignin)
    
    app.get('/m/user/:id',User.signinRequired,User.mInfo)

    app.get('/m/morelike',User.signinRequired,User.mLikeMore)



    //search
    app.get('/m/all',Index.mFindall)

    app.get('/m/search',Index.mSousuo)


    

}
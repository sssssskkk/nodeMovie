var Movie = require('../models/movie.js');
var User = require('../models/user.js');
var Category = require('../models/category.js');
var Comment = require('../models/comment.js');
var _ = require('underscore');
var fs=require('fs');
var path=require('path');
exports.jiazai=function(req,res){
    var userId=req.body.userId;
    var movieId=req.body.movieId;
}
exports.detail= function(req, res){
    var id = req.params.id;
    var peopleId=req.query.colpeopleId;
    Movie.update({_id:id},{$inc:{look:1}},function(err){
        if(err){
            res.redirect('error');
        }
    })
    Movie.findById(id,function(err,movie){
        Category
            .find({'name':'最热'})
            .populate({
                path:'movies',
                options:{sort:{_id:-1}}
            })
            .exec(function(err,hot){
        var opts=[{
            path   : 'category.movies',
            select : 'title poster',
            model  : 'Movie'
        }];
        Movie.populate(movie,opts,function(err,lastMovie){
            Comment
                .find({movie:id})
                .populate('from','name pic') 
                .populate('reply.from')
                .populate('reply.to')
                .limit(10)     
                .exec(function(err,comments){
                    var likeMovies=[];
                    for(var i=0;i<6;i++){
                        likeMovies.push(lastMovie.category.movies[i])
                    }
                    var actors=movie.actors.split(',');
                    var actorsPic=movie.actorpic.split(',');
                    var Arr=[];
                    var str='';
                    for(var i=0;i<actors.length;i++){
                        var obj={}; 
                        obj.name=actors[i];
                        obj.pic=actorsPic[i];
                        Arr.push(obj);
                        obj=null;
                    }
                    var showpic=movie.showpic.split(',')
                    res.render('detail', {
                        title: movie.title+' - 电影详情 - 影院前线',
                        keywords:movie.title+'，电影，'+movie.title+'，'+movie.actors,
                        description:movie.summary,
                        comments:comments,
                        movie: movie,
                        likes:likeMovies,
                        actorinfo:Arr,
                        showpic:showpic,
                        hots:hot[0].movies,
                        status:movie.colpeople
                    })
                });
        })
            })
    });
};
exports.more=function(req,res){
    var movieId=req.body.movieId;
    var userId=req.body.userId;
    var count=10;
    var comhave;
    var num=req.body.num;
    var index=num*count;
    var status=req.body.status;
    if(status=='all'){
        Comment
        .find({movie:movieId})
        .sort({_id:1})
        .populate('from')
        .populate('reply')
        .populate('reply.from')
        .exec(function(err,comments){
            if(userId==''){
                var results=comments.slice(index,index+count);
                if(results.length<10){
                    comhave='done'
                }else{
                    comhave='have'
                }
                res.json({'comments':results,'have':comhave,'user':''})
            }else{
                User.findById(userId,function(err,user){
                    var results=comments.slice(index,index+count);
                    if(results.length<10){
                        comhave='done'
                    }else{
                        comhave='have'
                    }
                    res.json({'comments':results,'user':user,'have':comhave})
                })
            }
        })

    }else{
        Comment
            .find({movie:movieId})
            .sort({_id:-1})
            .populate('from')
            .populate('reply')
            .populate('reply.from')
            .exec(function(err,comments){
                if(userId==''){
                    var results=comments.slice(index,index+count);
                    if(results.length<10){
                        comhave='done'
                    }else{
                        comhave='have'
                    }
                    res.json({'comments':results,'have':comhave,'user':''})
                }else{
                    User.findById(userId,function(err,user){
                        var results=comments.slice(index,index+count);
                        if(results.length<10){
                            comhave='done'
                        }else{
                            comhave='have'
                        }
                        res.json({'comments':results,'user':user,'have':comhave})
                    })

                }
        })
    }

}
exports.loadnew=function(req,res){
    var movieId=req.body.movieId;
    var userId=req.body.userId;
    Comment
        .find({movie:movieId})
        .populate('from')
        .populate('reply')
        .populate('reply.from')
        .populate('to')
        .sort({_id:-1})
        .limit(10)
        .exec(function(err,comments){
            if(userId==''){
                if(results.length<10){
                    comhave='done'
                }else{
                    comhave='have'
                }
                res.json({'comments':comments,'user':''})
            }else{
                User.findById(userId,function(err,user){
                    if(comments.length<10){
                        comhave='done'
                    }else{
                        comhave='have'
                    }
                    res.json({'comments':comments,'user':user})
                })
            }
        })
}
exports.loadall=function(req,res){
    var movieId=req.body.movieId;
    var userId=req.body.userId;
    Comment
        .find({movie:movieId})
        .populate('from')
        .populate('reply')
        .populate('reply.from')
        .populate('to')
        .sort({_id:1})
        .limit(10)
        .exec(function(err,comments){
            if(userId==''){
                if(results.length<10){
                    comhave='done'
                }else{
                    comhave='have'
                }
                res.json({'comments':comments,'user':''})
            }else{
                User.findById(userId,function(err,user){
                    if(comments.length<10){
                        comhave='done'
                    }else{
                        comhave='have'
                    }
                    res.json({'comments':comments,'user':user})
                })
            }
        })
}
exports.saveNew= function(req, res){
    Category.find({},function(err,categories){
        res.render('admin', {
            title: '后台管理',
            categories:categories,
            movie:{}
        }); 
    })
};
exports.update= function(req, res){  
    var id = req.params.id;
    if(id){
      Movie.findById(id,function(err,movie){
        Category.find({},function(err,categories){
          res.render('admin',{
              title: '更新',
               movie: movie,
               categories,categories
              });
            })
        });
    }
};
exports.savePoster=function(req,res,next){
    var posterData=req.files.uploadPoster;
    var filePath=posterData.path
    var posterOrigName=posterData.originalFilename
    if(posterOrigName){  
        fs.readFile(filePath,function(err,data){
            var timer=Date.now()
            var type=posterData.type.split('/')[1]
            var posterName=timer+ '.' +type
            var newPath=path.join(__dirname,'../../','public/upload/'+posterName)
            fs.writeFile(newPath,data,function(err){
                if(err){
                    res.redirect('error');
                }
                req.poster=posterName
                next();
            })
        })
    }
    else{
        next()
    }
}
exports.save= function(req, res){
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if(req.poster){
        movieObj.poster=req.poster
    }
    if(id){  
        Movie.findById(id,function(err,movie){
            if(err){
                res.redirect('error');
            }   
            var _id=movie._id
            delete movie._id;
            movie.poster==movieObj.poster
            _movie = _.extend(movie,movieObj);
            _movie.save(function(err, movie) {
        if (err) {
          res.redirect('error');
        }
        res.redirect('/movie/' + movie._id)
      })
            });
    }else{
        _movie = new Movie(movieObj);
        var categoryId=movieObj.category
        var categoryName=movieObj.categoryName
        _movie.save(function(err,movie){
            if(err){
                res.redirect('error');;
            }
            if(categoryId){
                Category.findById(categoryId,function(err,category){
                    category.movies.push(movie._id)
                    category.save(function(err,category){
                        res.redirect('/movie/'+ movie._id);
                    })
                })
            }
            else if(categoryName){      
                var category=new Category({
                    name:categoryName,
                    movies:[movie._id]
                })
                category.save(function(err,category){   
                    movie.category=category._id
                    movie.save(function(err,movie){
                        res.redirect('/movie/'+ movie._id);
                    })    
                 })
            }
        });
    }
};
exports.list= function(req, res){
    Movie.fetch(
        function(err,movies){
            if(err){
                res.redirect('error');;
            }
            res.render('list', {
                title: '列表',
                movies:movies
            });
        }
    );
};
exports.del= function(req,res){
    var id = req.query.id;
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
               res.redirect('error');;
            }else{
                res.json({success:1});
            }
        });
    }
}

// mobile


exports.mDetail= function(req, res){
    var id = req.params.id;
    var peopleId=req.query.colpeopleId;
    Movie.update({_id:id},{$inc:{look:1}},function(err){
        if(err){
            res.redirect('error');
        }
    })

    Movie
        .findOne({_id:id})
        .populate('category')
        .exec(function(err,thsmov){
            var cateId=thsmov.category._id

            Category
                .findOne({_id:cateId})
                .populate('movies')
                .limit(6)
                .exec(function(err,catemocies){ 
                    console.log(catemocies.movies.length)


                    Comment
                        .find({movie:id})
                        .populate('from','name pic') 
                        .populate('reply.from')
                        .populate('reply.to')
                        .limit(6)
                        .sort({_id:1})     
                        .exec(function(err,comments){

                        Comment  
                            .find({movie:id})
                            .populate('from','name pic') 
                            .populate('reply.from')
                            .populate('reply.to')
                            .limit(6)     
                            .sort({_id:-1})
                            .exec(function(err,newcomments){
                                res.render('mDetail', {
                                title: thsmov.title+' - 电影详情 - 影院前线',
                                keywords:thsmov.title+'，电影，'+thsmov.title+'，'+thsmov.actors,
                                description:thsmov.summary,
                                comments:comments,
                                movie: thsmov,
                                likes:catemocies.movies,
                                newcomments:newcomments,
                                status:thsmov.colpeople
                            })

                        });


                    });
                })

           


        })




};


exports.mMovieMore=function(req,res){
    var count=req.query.len;
    var len=20;
    console.log(count)

    Movie
        .find({})
        .sort({_id:-1})
        .exec(function(err,movies){

            var send=movies.splice(count,len);
            if(send.length!=len){
                res.json({'status':0,'movies':send})
            }else{
                res.json({'status':1,'movies':send})
                
            }

        })
}


exports.mPartMore=function(req,res){
    var part=req.query.choice;
    var count=req.query.len;
    var len=20;
    Movie
        .find({choice:part})
        .sort({_id:-1})
        .exec(function(err,movies){

            var send=movies.splice(count,len);
            if(send.length!=len){
                res.json({'status':0,'movies':send})
            }else{
                res.json({'status':1,'movies':send})
                
            }

        })
}



exports.mMovieCate=function(req,res){
    var count=req.query.len;   //index
    var catName=req.query.cat;
    var num=20; // 要加载的数量
    // var page=parseInt(req.query.p,10) || 0
    // var q=req.query.q
    // var index=page*count
    if(catName){
        Category
            .find({cat:catName})
            .populate({
                path:'movies',  
                options:{sort:{_id:-1}}
                })   
            .exec(function(err,categories){
                if(err){
                    res.redirect('/error');
                }
                var category=categories[0] || {}
                var movies=category.movies || []
                var results=movies.splice(count,num)
                res.render('mCates', {
                    title: '好看的'+category.name+'电影-影院前线',
                    keywords:'影院前线_2016最新电影，各种种类电影信息及下载链接',
                    description:'影院前线_提供喜剧电影、爱情电影、科幻电影、恐怖电影、搞笑电影等国内外最新最热电影资源及下载链接。开始搜索找到你喜欢的电影吧',
                    keyword:category.name,
                    // currentPage:(page+1) ,
                    query:'cat='+catName,        
                    // totalPage:Math.ceil(movies.length/count),
                    movies:results  
                });
            })
        }else{
            res.redirect('/');
        }
}



exports.year=function(req,res){
    var num=20; // 要加载的数量
    var query=req.query;
    var count=query.len;   //index
    var year=query.year; 
    var start=query.start; 
    var end=query.end; 

    if(year){

        Movie
            .find({year:year})
            .sort({_id:-1})
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
        
                var send=movies.splice(count,num)

                if(send.length!=num){
                    res.json({'status':0,'movies':send})
                }else{
                    res.json({'status':1,'movies':send})
                    
                }


            
            })

    }

    if(start&&end){


        Movie
            .find({'year':{'$gte':start,'$lte':end}})
            .sort({_id:-1})
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
                
                var send=movies.splice(count,num)

                if(send.length!=num){
                    res.json({'status':0,'movies':send})
                }else{
                    res.json({'status':1,'movies':send})
                    
                }

            })
    }

  
}




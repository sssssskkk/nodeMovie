var New = require('../models/new.js');
var _ = require('underscore');
exports.detail= function(req, res){
    var id = req.params.id;
    Movie.update({_id:id},{$inc:{look:1}},function(err){
        if(err){
        }
    })
    Movie.findById(id,function(err,movie){
        var opts=[{
            path   : 'category.movies',
            select : 'title poster',
            model  : 'Movie'
        }];
        Movie.populate(movie,opts,function(err,lastMovie){
            Comment
                .find({movie:id})
                .populate('from','name')      
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
                        title: '详情',
                        comments:comments,
                        movie: movie,
                        likes:likeMovies,
                        actorinfo:Arr,
                        showpic:showpic
                    })
                });
        })
    });
};
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
                res.redirect('/error');
            }
            var _id=movie._id
            delete movie._id;
            _movie = _.extend(movie,movieObj);
            Movie.update({_id:_id},_movie,function(err){
                if(err){
                    res.redirect('/error');
                }
                    res.redirect('/movie/'+ _movie._id);
                })
            });
    }else{
        _movie = new Movie(movieObj);
        var categoryId=movieObj.category
        var categoryName=movieObj.categoryName
        _movie.save(function(err,movie){
            if(err){
                res.redirect('/error');
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
                res.redirect('/error');
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
               res.redirect('/error');
            }else{
                res.json({success:1});
            }
        });
    }
}

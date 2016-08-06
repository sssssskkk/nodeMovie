var Movie = require('../models/movie.js');
var User = require('../models/user.js');
var Category = require('../models/category.js');
var Comment = require('../models/comment.js');
var _ = require('underscore');

var fs=require('fs');
var path=require('path');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
exports.register=function(req,res){
    res.render('register',{
        title:'注册'
    })
}

exports.identify=function(){
    
}

exports.signin=function(req,res){
    res.render('signin',{
        title:'登录'
    })
}
exports.rest=function(req,res){
    res.render('restpswd',{
        title:'修改密码'
    })
}
exports.pswdsend=function(req,res){
    var userId=req.body.userId;
    var pswd=req.body.pswd;
    var newpswd=req.body.newpswd;
    User.findById(userId,function(err,user){
        if(err){
            res.redirect('/error');
        }
        if(user.password!==pswd){
            res.json({'msg':0})
        }else{
            user.password=newpswd;
            user.save(function(err){
                if(err){
                    res.redirect('/error');
                }
            })
            res.json({'msg':1})
        }
    })
}
exports.postComsign=function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var movieId=req.body.movieId;
    User.findOne({name:username},function(err,user){
        if(err){
            res.redirect('/error');
        }
        if(!user){
            res.json({'msg':0})
            return false;
        }else if(user.password==password){
            Movie.findById(movieId,function(err,movie){
                req.session.user=user          
                res.json({'msg':1,'movie':movie._id})
            })
        }else{
            res.json({'msg':2})
            return false;
        }
    })
}
exports.usertest=function(req,res){
    var username=req.body.username;
    User
        .findOne({name:username})
        .exec(function(err,user){
            if(err){
            res.redirect('/error');
        }
            if(user){
                res.json({'msg':'用户名存在','num':0})
            }else{
                res.json({'msg':'用户名可用','num':1})
            }
        })
}
exports.postRegister=function(req,res){
    var _user=req.body.user
    User.findOne({name:_user.name},function(err,user){
        if(err){
            res.redirect('/error');
        }
        if(user){
            res.redirect('/register')
            return false;
        }else{
            var user=new User(_user)
            user.save(function(err,user){
                if(err){
                    res.redirect('/error');
                }
                res.redirect('/signin')
            })
        }
    }) 
}
exports.postSignin=function(req,res){
    var name=req.body.user;
    var password=req.body.pswd;
    User.findOne({name:name},function(err,user){
        if(err){
            res.redirect('/error');
        }
        if(!user){
            res.json({'msg':0})
            return false;
        }
        if(user.password==password){
            req.session.user=user  
            res.json({'msg':1})        
        }else{
            res.json({'msg':2})
            return false;
        }
    })
}
exports.logout=function(req,res){
    delete req.session.user 
    res.redirect('/')
}
exports.userlist=function(req, res){
    User.fetch(function(err,users){
        if(err){
            res.redirect('/error');;
        }
        res.render('userlist', {
            title: '用户列表页',
            users:users
        });
    });
};
exports.signinRequired=function(req, res,next){
    var user=req.session.user
    if(!user){
        return res.redirect('/signin')
    }
    next()
}
exports.adminRequired=function(req, res,next){
    var user=req.session.user
    if(user.role<=10){
        return res.redirect('/signin')
    }
    next()
}
exports.shoucang= function(req, res){
    var movieId=req.body.colMovieId;
    var userId=req.body.colUserId;
    User.findById(userId,function(err,user){
        if(err){
            res.redirect('/error');
        }
        Movie
            .findOne({_id:movieId})
            .select('colpeople')
            .exec(function(err,movie){
                if(err){
                    res.redirect('/error');
                }
            var arr=user.collects;
            if(arr.indexOf(movieId)>-1){
                for(var i=0;i<arr.length;i++){
                        if(arr[i]==movieId){
                            arr.splice(i,1);
                        }
                    }
                for(var j=0;j<movie.colpeople.length;j++){
                    if(movie.colpeople[j]==userId){
                    movie.colpeople.splice(j,1);
                    }
                }
                user.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                movie.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                res.json({col:0})
            }else{
                arr.push(movieId)
                movie.colpeople.push(userId);
                user.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                movie.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                res.json({col:1})
        }
        })
    })
};
exports.prise= function(req, res){
    var movieId=req.body.priMovieId;
    var userId=req.body.priUserId;
    var commentId=req.body.priCommentId;
    User.findById(userId,function(err,user){
        if(err){
            res.redirect('/error');
        }
        Comment
            .findOne({_id:commentId})
            .select('pripeople')
            .exec(function(err,comment){
                if(err){
                    res.redirect('/error');
                }
            var arr=user.prises;
            if(arr.indexOf(commentId)>-1){
                for(var i=0;i<arr.length;i++){
                        if(arr[i]==commentId){
                            arr.splice(i,1);
                        }
                    }
                for(var j=0;j<comment.pripeople.length;j++){
                    if(comment.pripeople[j]==userId){
                    comment.pripeople.splice(j,1);
                    }
                }
                user.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                comment.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                res.json({pri:0})
            }else{
                arr.push(commentId)
                comment.pripeople.push(userId);
                user.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                comment.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                res.json({pri:1})        
            }

        })
    })
};
exports.formi=function(req,res){
if (req.url == '/formi' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';        
    form.uploadDir = 'public/upload/' ;    
    form.keepExtensions = true;  
    var user='';
    if(req.session.user){
        user=req.session.user;
    }
    var userId=user._id;
    form.parse(req, function(err, fields, files) {
        var file=files.files;
        var timer=Date.now()
        var type=file.type.split('/')[1];
        var newName=timer+ '.' +type;
        var newPath='public/upload/'+newName;
          fs.renameSync(file.path, newPath);
          User.update({_id:userId},{'$set':{'pic':newName}},function(err){
                if(err){
                    res.redirect('/error');
                }
          })
          var _user='';
          User.findById(userId,function(err,user){
            user.save(function(err){
                if(err){
                    res.redirect('/error');
                }
            })
            req.session.user=user;
            req.session.save(function(err){
                if(err){
                    res.redirect('/error');
                }
            })
      res.redirect('/user/'+userId+'?p=0')
          })
    });
  }

}
exports.info= function(req, res){
    var catName=req.query.cat
    var page=parseInt(req.query.p,10) || 0
    var count=8;        
    var index=page*count
    var id = req.params.id
    User
        .findOne({_id:req.session.user._id})
        .populate({
            path:'collects',
            select:{title:1,poster:1,average:1,_id:1},
            options:{sort:{_id:-1}}
        })
        .exec(function(err,user){
            var results=user.collects.slice(index,index+count)
            res.render('myinfo',{
                title:user.name+'-个人主页',
                user:user,
                colcount:user.collects.length,
                currentPage:(page+1) ,
                totalPage:Math.ceil(user.collects.length/count),
                loves:results
            })
        })
};
exports.updateinfo= function(req, res){
    var age=req.body.age;
    var sex=req.body.sex;
    var email=req.body.email;
    var userId=req.body.user;
    User.findById(userId,function(err,user){
        if(err){
            res.redirect('/error');
        }
        if(age!=''){
            User.update({_id:userId},{'$set':{'age':age}},function(err){
                if(err){
                    res.redirect('/error');
                }
            })
        }
        if(sex!=''){
            User.update({_id:userId},{'$set':{'sex':sex}},function(err){
                if(err){
                    res.redirect('/error');
                }
            })
        }
        if(email!=''){
            User.update({_id:userId},{'$set':{'email':email}},function(err){
                if(err){
                    res.redirect('/error');
                }
            })
        }
        user.save(function(err){
            if(err){
                res.redirect('/error');
            }
        })
        res.json({status:'更新成功'});
    })
};


//--------mobile
//
exports.mRegister=function(req,res){
    res.render('mRegister',{
        title:'注册'
    })
}


exports.mSignin=function(req,res){
    res.render('mLogin',{
        title:'登录'
    })
}


exports.mPostSignin=function(req,res){
    var name=req.body.user;
    var password=req.body.pswd;
    User.findOne({name:name},function(err,user){
        if(err){
            res.redirect('/error');
        }
        if(!user){
            res.json({'msg':0})
            return false;
        }
        if(user.password==password){
            req.session.user=user  
            res.json({'msg':1})        
        }else{
            res.json({'msg':2})
            return false;
        }
    })
}



exports.mInfo= function(req, res){
    var catName=req.query.cat
    var page=parseInt(req.query.p,10) || 0
    var count=8;        
    var index=page*count
    var id = req.params.id
    User
        .findOne({_id:req.session.user._id})
        .populate({
            path:'collects',
            select:{title:1,poster:1,average:1,_id:1,actors:1},
            options:{limit:22,sort:{_id:-1}}
        })
        .exec(function(err,user){
            var results=user.collects.slice(0).length;
            res.render('mUser',{
                title:user.name+'-个人主页',
                user:user,
                colcount:user.collects.length,
                currentPage:(page+1) ,
                totalPage:Math.ceil(user.collects.length/count),
                loves:results
            })
        })
};



exports.mShoucang= function(req, res){
    var movieId=req.body.movieId;
    var userId=req.body.userId;
    console.log(movieId,userId)
    User.findById(userId,function(err,user){
        if(err){
            res.redirect('/error');
        }
        Movie
            .findOne({_id:movieId})
            .select('colpeople')
            .exec(function(err,movie){
                if(err){
                    res.redirect('/error');
                }
            var arr=user.collects;
            if(arr.indexOf(movieId)>-1){
                for(var i=0;i<arr.length;i++){
                        if(arr[i]==movieId){
                            arr.splice(i,1);
                        }
                    }
                for(var j=0;j<movie.colpeople.length;j++){
                    if(movie.colpeople[j]==userId){
                    movie.colpeople.splice(j,1);
                    }
                }
                user.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                movie.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                res.json({col:0})
            }else{
                arr.push(movieId)
                movie.colpeople.push(userId);
                user.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                movie.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                res.json({col:1})
        }
        })
    })
};


exports.mPrise= function(req, res){
    var movieId=req.body.movieId;
    var userId=req.body.userId;
    var commentId=req.body.commentId;
    
    User.findById(userId,function(err,user){
        if(err){
            res.redirect('/error');
        }
        Comment
            .findOne({_id:commentId})
            .select('pripeople')
            .exec(function(err,comment){
                if(err){
                    res.redirect('/error');
                }
            var arr=user.prises;
            if(arr.indexOf(commentId)>-1){
                for(var i=0;i<arr.length;i++){
                        if(arr[i]==commentId){
                            arr.splice(i,1);
                        }
                    }
                for(var j=0;j<comment.pripeople.length;j++){
                    if(comment.pripeople[j]==userId){
                    comment.pripeople.splice(j,1);
                    }
                }
                user.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                comment.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                res.json({pri:0})
            }else{
                arr.push(commentId)
                comment.pripeople.push(userId);
                user.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                comment.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                })
                res.json({pri:1})        
            }

        })
    })
};


exports.mLogout=function(req,res){
    delete req.session.user 
    res.redirect('/m/index')
}


exports.mUpdateinfo= function(req, res){
    var age=req.body.age;
    var sex=req.body.sex;
    var email=req.body.email;
    var userId=req.body.user;

    User.findById(userId,function(err,user){
        if(err){
            res.redirect('/error');
        }
        if(age!=''){
            User.update({_id:userId},{'$set':{'age':age}},function(err){
                if(err){
                    res.redirect('/error');
                }
            })
        }
        if(sex!=''){
            User.update({_id:userId},{'$set':{'sex':sex}},function(err){
                if(err){
                    res.redirect('/error');
                }
            })
        }
        if(email!=''){
            User.update({_id:userId},{'$set':{'email':email}},function(err){
                if(err){
                    res.redirect('/error');
                }
            })
        }
        user.save(function(err){
            if(err){
                res.redirect('/error');
            }
        })
        res.json({status:'更新成功'});
    })
};


exports.mPostRegister=function(req,res){
    var _user=req.body.user
    // console.log(_user)
    User.findOne({name:_user.name},function(err,user){
        if(err){
            res.redirect('/error');
        }
        if(user){
            res.json({'status':2})
            // res.redirect('/m/register');

            return false;
        }else{
            var user=new User(_user)
            user.save(function(err,user){
                if(err){
                    res.redirect('/error');
                }
                res.json({'status':1})
                // res.redirect('/m/login')
            })
        }
    }) 
}


exports.mLikeMore=function(req,res){
    var count=req.query.len;
    var userId=req.query.user;
    var len=20;

    User
        .findOne({_id:userId})
        .populate({
            path:'collects',
            select:{title:1,poster:1,average:1,_id:1,actors:1},
            options:{sort:{_id:-1}}
        })
        .exec(function(err,user){
            var send=user.collects.splice(count,len);
            res.json({'more':send})
        })
        
}









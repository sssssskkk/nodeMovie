var Comment = require('../models/comment.js');
var User = require('../models/user.js');
exports.save= function(req, res){
    var movieId=req.body.movieId;
    var userId=req.body.userId;
    var commentId=req.body.commentId;
    var fromId=req.body.fromId;
    var toId=req.body.toId;
    var content=req.body.content;
    if(commentId){  
        User
            .findOne({_id:userId})
            .exec(function(err,user){
                Comment
                .findOne({_id:commentId})
                .exec(function(err,comment){
                if(err){
                    res.redirect('/error');
                }
                var reply={
                    from:req.body.fromId,  
                    to:req.body.toId,       
                    content:req.body.content
                }
                comment.reply.push(reply)
                comment.save(function(err){
                    if(err){
                        res.redirect('/error');
                    }
                }) 
                    res.json({'comment':comment,'user':user})
                })
            })
    }
    else{
        var comment=new Comment(req.body.comment);
        var comment_from=req.body.comment.from;
        comment.save(function(err,comment){
            if(err){
                res.redirect('/error');
            }
            User.findOne({_id:comment_from})
            .select('pic')
            .exec(function(err,user){
                 res.json({comment:comment,pic:user.pic})
            })
        })         
    }
};



exports.mComMore=function(req,res){
    var count=req.query.len;
    var id=req.query.id;
    var len=10;
    console.log(count)

    Comment
        .find({movie:id})
        .populate('from','name pic') 
        .populate('reply.from')
        .populate('reply.to')
        // .limit(6)
        .sort({_id:1})     
        .exec(function(err,comments){
            var send=comments.splice(count,len)
            if(send.length!=len){
                res.json({'status':0,'comments':send})
            }else{
                res.json({'status':1,'comments':send})
            }
        })

    
}


exports.mSave= function(req, res){
    var userId=req.body.comment.from;
    var comment=new Comment(req.body.comment);
    comment.save(function(err,comment){
        if(err){
            res.redirect('/error');
        }
        User.findOne({_id:userId})
        .select('pic')
        .exec(function(err,user){
             res.json({'comment':comment,'pic':user.pic})
        })
    })         
    
    
    
};
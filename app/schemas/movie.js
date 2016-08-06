var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var MovieSchema = new mongoose.Schema({
    title:[{type:String,ref:'User'}],
    colpeople:[{type:ObjectId,ref:'User'}],
    director:String,
    average:String,
    url:String,
    hotword:String,
    choice:String,
    bannerid:String,
    bannerpic:String,
    language:String,
    summary:String,
    poster:String,
    year:Number,
    country:String,
    genres:String,
    actors:String,
    actorpic:String,
    showpic:String,
    piaofang:Number,
    mPoster:String,
    mBanner:String,
    look:{
        type:Number,
        default:0
    },
    comments:[{ 
        type:ObjectId, 
        ref: 'Comment'
    }],
    category:{
        type:ObjectId,  
        ref:'Category', 
        autopopulate:true
    },
    meta: {
      createAt: {
          type:Date,
          default:Date.now()
      },
      updateAt: {
        type:Date,
        default:Date.now()
      }
    }

});
MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt =  Date.now();
    }
    next();
});
MovieSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id}).populate('category')
            .exec(cb)
    }
}

module.exports = MovieSchema
var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var NewSchema = new mongoose.Schema({
    title:String,
    time:String,
    id:String,
    poster:String,
    summary:String,
    look:{
        type:Number,
        default:0
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
NewSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt =  Date.now();
    }
    next();
});
NewSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

module.exports = NewSchema
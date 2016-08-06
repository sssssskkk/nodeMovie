var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var PiaofangSchema = new mongoose.Schema({
    title:String,
    director:String,
    actors:String,
    genres:String,
    country:String,
    status:Number,
    poster:String,
    long:String,
    time:String,
    version:String
});
PiaofangSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt =  Date.now();
    }
    next();
});
PiaofangSchema.statics = {
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
module.exports = PiaofangSchema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var ObjectId=Schema.Types.ObjectId;
var UserSchema = new Schema({
    name:{type:String,required:true,unique:true},
    sex:String,
    age:Number,
    pic:{type:String,default:''},
    email:{type:String,default:''},
    password:{type:String,required:true},
    role:{
        type:Number,
        default:0
    },
    collects:[
        {type:ObjectId,ref:'Movie'}
    ],
    prises:[
        {type:ObjectId,ref:'Comment'}
    ],
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});
UserSchema.pre('save',function(next){
    var user = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else{
        this.meta.updateAt = Date.now();
    }
    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err){
            return next(err);
        }
        next();
    });
});
UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  }
}
UserSchema.statics = {
    fetch: function(cb){
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb){
        return this.findOne({_id: id}).populate('movie').exec(cb);
    }
};

module.exports = mongoose.model('User',UserSchema);



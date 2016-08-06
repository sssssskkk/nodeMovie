var crypto=require('crypto');
var should=require('should');
var app=require('../../app');
var mongoose=require('mongoose');
var User=require('../../app/models/user')
var user;

function getName(len){
	if(!len) len=16;
	return crypto.randomBytes(Math.ceil(len/2)).toString('hex')
}


describe('<Unit Test>',function(){
	describe('model user',function(){
		before(function(done){
			user={
				name:getName(),
				password:'password'
			}
			done();
		})	

		describe('before save',function(){
			it('should not have a user',function(done){
				User.find({name:user.name},function(err,users){
					users.should.have.length(0)
					done()
				})

			})
		})

		describe('user save',function(){
			it('save should not have a pronlems',function(done){
				var _user=new User(user);
				_user.save(function(err){
					should.not.exist(err);
					_user.remove(function(err){
						should.not.exist(err)
						done()
					})
				})
			})

			it('should password compare',function(done){
				var password=user.password;
				var _user=new User(user);
				_user.save(function(err){
					should.not.exist(err)
					_user.password.should.equal(password)
					// password==_user.password
					_user.remove(function(err){
						should.not.exist(err)
						done()
					})
				})
			})


			it('should have default role 0',function(done){
				var _user=new User(user);
				_user.save(function(err){
					_user.role.should.equal(0)
					_user.remove(function(err){
						done()
					})
				})
			})


			it('should not have a same user',function(done){
				var _user1=new User(user);
				_user1.save(function(err){
					should.not.exist(err)
					var _user2=new User(user);
					_user2.save(function(err){
						should.exist(err);
						_user1.remove(function(err){
							if(!err){
								_user2.remove(function(err){
									done()
								})
							}
						})
					})
				});
			})

		})
	})
})

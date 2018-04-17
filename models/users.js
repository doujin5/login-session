var mongoose=require('mongoose');
var schema = new mongoose.Schema({ username: {type:'string', unique:true, required:true}, password: 'string', phone:'number' });
var users = mongoose.model('users', schema);



module.exports=users;
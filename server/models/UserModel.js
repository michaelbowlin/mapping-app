var mongoose = require('mongoose'),
    properties = require('./PropertyModel.js'),
    addressSchema = require('./AddressModel.js'),
    billingSchema = require('./BillingModel.js'),
    properties = require('./PropertyModel.js'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  dateCreated: {type: Date, required:'{PATH} is required!', default: Date.now()},
  dateUpdated: {type: Date, required:'{PATH} is required!', default: Date.now()},
  firstName: {type:String, required:'{PATH} is required!'},
  lastName: {type:String, required:'{PATH} is required!'},
  accountKey: {type:String},
  username: {
    type: String,
    required: '{PATH} is required!',
    unique:true
  },
  salt: {type:String, required:'{PATH} is required!'},
  hashed_pwd: {type:String, required:'{PATH} is required!'},
  roles: [String],
  properties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Property'}],
  address: [addressSchema],
  billing: [billingSchema]
});

userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'brian');
      User.create({firstName:'Brian',lastName:'Childress',username:'brian', salt: salt, hashed_pwd: hash, roles: ['admin']});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'michael');
      User.create({firstName:'Michael',
        lastName:'Bowlin',
        username:'michael',
        salt: salt,
        hashed_pwd: hash,
        roles: ['admin'],
        address:[{
          street: '123 My Street',
          city: 'Denver',
          state: 'Colorado',
          zipCode: '80214'
        }],
        billing: [{
          accountType: 'Standard',
          accountContact: [{
            contactName: 'Michael Bowlin',
            contactEmail: 'michael@web5280.com'
          }]
        }]
      });
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'gavin');
      User.create({firstName:'Gavin',lastName:'Gavin',username:'gavin', salt: salt, hashed_pwd: hash, roles: ['admin']});
    }
  })
};

exports.createDefaultUsers = createDefaultUsers;
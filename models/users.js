var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    balance: {
        type: Number
    },
    emailVerified: {
        type: Boolean
    }
})

var Users = module.exports = mongoose.model('users', usersSchema)

//add users
module.exports.addUsers = function (user, callback) {
    Users.create(user, callback)
}



//get genres

module.exports.getUsers = function (callback, limit) {
    Users.find(callback).limit(limit)
}
//

module.exports.getUsersById = function (id, callback){

    Users.findById(id).exec(callback);
}

module.exports.getUsersByEmail = function (email, callback) {
    Users.findOne({email: email}, '', {lean: true}, callback)
};

//Update User
module.exports.updateUsersBalance = function (id, user, options, callback) {
    var update = {
        balance: user.balance,
    }

    // Model.findByIdAndUpdate
    Users.findByIdAndUpdate(id, update, options, callback)
}

module.exports.updateUsersVerification = function (id,  options, callback) {
    var update = {
        emailVerified: true
    }

    // Model.findByIdAndUpdate
    Users.findByIdAndUpdate(id, update, options, callback)
}

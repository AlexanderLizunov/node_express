var mongoose = require('mongoose');

var AvailableMenuSchema = mongoose.Schema([
    {
        date: {
            type: String,
            required: true
        },
        availableMenu: [{
            title: {
                type: String,
                required: true
            },
            avatar: {
                type: String,
                required: true
            }
        }]
    }
])

var AvailableMenu = module.exports = mongoose.model('AvailableMenu', AvailableMenuSchema)

module.exports.addAvailableMenu = function (Menu, callback) {

    AvailableMenu.create(Menu, callback)

}


module.exports.getAvailableMenu = function (callback, limit) {
    AvailableMenu.find(callback).limit(limit)
};






module.exports.getBookById = function (id, callback) {
    AvailableMenu.findById(id, callback);
}


module.exports.updateBook = function (id, book, options, callback) {
    var query = {_id: id};
    var update = {
        name: book.name
    }
    AvailableMenu.findOneAndUpdate(query, update, options, callback)
}

//Delete AvailableMenu
module.exports.removeBook = function (id, callback) {
    var query = {_id: id};
    AvailableMenu.remove(query, callback)
}
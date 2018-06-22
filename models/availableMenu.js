var mongoose = require('mongoose');


var AvailableMenuSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: false
        },
        availableMenu: [
            [
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                }
            ],
            [
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                }
            ],
            [
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                }
            ],
            [
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                },
                {
                    title: {
                        _id: false,
                        type: String,
                        required: false
                    },
                    image: {
                        _id: false,
                        type: String,
                        required: false
                    }
                }
            ]
        ]
    }
)

// var widgetSchema = new Schema({ ... attributes ... }, { versionKey: false });

var AvailableMenu = module.exports = mongoose.model('AvailableMenu', AvailableMenuSchema)


module.exports.updateMenu = function (date, menu, options, callback) {
    console.log("UPDATE")
    var query = {date: date};
    var update = {
        availableMenu: menu.availableMenu
    }


    AvailableMenu.findOneAndUpdate(query, update, { upsert: true }, callback)

}



module.exports.addAvailableMenu = function (Menu, callback) {

    AvailableMenu.create(Menu, callback)

}


module.exports.getAvailableMenu = function (callback, limit) {
    AvailableMenu.find(callback).limit(limit)
};


module.exports.getAvailableMenuByDate = function (date, callback) {
    console.log(date)

    AvailableMenu.findOne({date: date}, callback)
};


module.exports.getBookById = function (id, callback) {
    AvailableMenu.findById(id, callback);
}



//Delete AvailableMenu
module.exports.removeBook = function (id, callback) {
    var query = {_id: id};

    AvailableMenu.remove(query, callback)
}
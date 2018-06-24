let mongoose = require('mongoose');

let AvailableMenuSchema = mongoose.Schema(
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
        ],
        ordering: {
            type: String
        }
    }
)

let AvailableMenu = module.exports = mongoose.model('AvailableMenu', AvailableMenuSchema)

module.exports.updateMenu = function (date, menu, options, callback) {
    let query = {date: date};
    let update = {
        availableMenu: menu.availableMenu
    }
    AvailableMenu.findOneAndUpdate(query, update, {upsert: true}, callback)
}

module.exports.updateMenuStatus = function (date, menu, options, callback) {
    let query = {date: date};
    let update = {
        ordering: menu.ordering
    }
    AvailableMenu.findOneAndUpdate(query, update, {upsert: true}, callback)
}

module.exports.addAvailableMenu = function (Menu, callback) {
    AvailableMenu.create(Menu, callback)
}

module.exports.getAvailableMenu = function (callback, limit) {
    AvailableMenu.find(callback).limit(limit)
};

module.exports.getAvailableMenuByDate = function (date, callback) {
    AvailableMenu.findOne({date: date}, callback)
};


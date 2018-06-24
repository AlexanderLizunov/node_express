let mongoose = require('mongoose');


let orderStoreSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: false
        },
        email: {
            type: String
        },
        orderNumber: {
            type: String
        },
        order: [
            {
                title: {
                    type: String
                },
                image: {
                    type: String
                }
            },
            {
                title: {
                    type: String
                },
                image: {
                    type: String
                }
            },
            {
                title: {
                    type: String
                },
                image: {
                    type: String
                }
            },
            {
                title: {
                    type: String
                },
                image: {
                    type: String
                }
            }
        ]

    }
)

let OrderStore = module.exports = mongoose.model('orderstore', orderStoreSchema)


module.exports.updateOrder = function (date, email, order, options, callback) {
    let query = {date: date, email:email };
    let update = {
        orderNumber: order.orderNumber,
        order: order.order
    }
    OrderStore.findOneAndUpdate(query, update, options, callback)
}

module.exports.addOrder = function (order, callback) {
    OrderStore.create(order, callback)
}

module.exports.getOrderListByEmail =  (email, callback)=> {
    console.log(email)
    OrderStore.find({email:email}).limit(30).sort("-date").exec(callback)
};

module.exports.getCurrentOrderByEmail =  (email, callback)=> {
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(email)
    OrderStore.findOne({email:email, date: date}).exec(callback)
};

module.exports.getOrderListByDate =  (date, callback)=> {
    console.log(date)
    OrderStore.find({date:date}).exec(callback)
};

var mongoose = require('mongoose');


var orderStoreSchema = mongoose.Schema(
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


var OrderStore = module.exports = mongoose.model('orderstore', orderStoreSchema)


module.exports.updateOrder = function (date, email, order, options, callback) {


    var query = {date: date, email:email };
    var update = {
        orderNumber: order.orderNumber,
        order: order.order
    }

    console.log("QUERY")

    console.log(query)
    OrderStore.findOneAndUpdate(query, update, options, callback)
}


module.exports.addOrder = function (order, callback) {

    OrderStore.create(order, callback)

}

module.exports.getOrderListByEmail =  (email, callback)=> {
    console.log(email)
    // OrderStore.find().where("email", email)
    // OrderStore.find({email: email})

    OrderStore.find({email:email}).limit(30).sort("-date").exec(callback)
};

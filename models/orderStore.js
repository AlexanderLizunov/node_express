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

// var widgetSchema = new Schema({ ... attributes ... }, { versionKey: false });

var OrderStore = module.exports = mongoose.model('orderstore', orderStoreSchema)


module.exports.updateOrder = function (date, email, order, options, callback) {

    console.log("UPDATE ORDER INCOME")
    console.log(date, email)
    console.log("order")

    console.log(order)
    console.log(order)

    console.log(order.order)


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
    OrderStore.find().where("email", email)
    OrderStore.find({email: email})
    console.log("!".repeat(50))
    // console.log(OrderStore.find({email: email}))
    OrderStore.find({email: email},  (err, docs)=> {
        if(err){
            throw err
        }else{
            // console.log("2".repeat(100))
            console.log(docs)
            return callback = docs

        }

    })
    // OrderStore.find({email: email}).toArray(function (err,result) {
    //     console.log(results);
    //     client.close();
    // })
};

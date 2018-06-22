var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express()

const CircularJSON = require('circular-json');

OrderStore = require('./models/orderStore');
AvailableMenu = require('./models/availableMenu');
Users = require('./models/users');

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
    next()
})

mongoose.connect('mongodb://localhost/orderDb', function (err, client) {
    console.log("Connected successfully to server");
});


var db = mongoose.connection
// console.log(db)

app.get('/', function (req, res) {
    res.send('NOTHING HERE')
    // res.send('Please use /api/books or /api/asdas')
});


//Users actions

// app.put

app.post('/api/users', function (req, res) {
    var user = req.body;
    try {
        Users.addUsers(user, function (err, callback) {
            // console.log('new')
            // console.log(menu)
            if (err) {
                console.log(err)
                throw err;
            }

            res.json(callback)
        })


    } catch (e) {

        console.log(e)
    }
});

app.get('/api/users', function (req, res) {
    Users.getUsers(function (err, docs) {
        if (err) {
            throw err;

        }
        res.json(docs)
    })
    // res.send('Please use /api/books or /api/asdas')
});

app.get('/api/user/:email', function (req, res) {
    const email = req.params.email
    console.log(email)
    console.log(req)

    Users.getUsersByEmail(email, function (err, docs) {
        if (err) {
            throw err;

        }
        res.json(docs)
    })
    // res.send('Please use /api/books or /api/asdas')
});


app.get('/api/users/:id', function (req, res) {
    const id = req.params.id
    Users.getUsersById(id, function (err, docs) {
        if (err) {
            throw err;

        }
        res.json(docs)
    })
    // res.send('Please use /api/books or /api/asdas')
});


app.put('/api/users/:id', function (req, res) {
    const id = req.params.id
    let user = req.body;
    console.log(user);
    console.log(id);

    Users.updateUsersBalance(id, user, function (err, docs) {
        if (err) {
            throw err;

        }
        res.json(docs)
    })
    // res.send('Please use /api/books or /api/asdas')
});

app.get('/api/users/validation/:id', function (req, res) {
    const id = req.params.id
    Users.updateUsersVerification(id, function (err, docs) {
        if (err) {
            throw err;


        }
        res.json(docs)
    })
    // res.send('Please use /api/books or /api/asdas')
});


// available Menu Requests

app.get('/api/availableMenu/:date', function (req, res) {
    const date = req.params.date
    console.log(date)
    console.log(req)
    AvailableMenu.getAvailableMenuByDate(date, function (err, docs) {
        if (err) {
            throw err;

        }
        res.json(docs)
    })
    // res.send('Please use /api/books or /api/asdas')
});


app.put('/api/availableMenu/:date', function (req, res) {
    const date = req.params.date
    const menu = req.body;
    console.log(date)
    AvailableMenu.updateMenu(date, menu, {}, function (err, response) {
        console.log(response)
        if (err) {
            console.log(err)
            throw err;
        } else {
            res.json(response)
        }
    })
});

app.put('/api/availableMenu/status/:date', function (req, res) {
    const date = req.params.date
    const menu = req.body;
    console.log(date)
    AvailableMenu.updateMenuStatus(date, menu, {}, function (err, response) {
        console.log(response)
        if (err) {
            console.log(err)
            throw err;
        } else {
            res.json(response)
        }
    })
});



//
// app.post('/api/availableMenu', function (req, res) {
//     // res.send('hello0 world')
//     var menu = req.body;
//     // res.send(menu)
//     console.log("priletelo")
//     console.log(menu)
//
//     console.log(JSON.stringify(menu))
//
//     try {
//         AvailableMenu.addAvailableMenu(menu, function (err, menu) {
//             // console.log('new')
//             // console.log(menu)
//             if (err) {
//                 console.log(err)
//                 throw err;
//             }
//
//             res.json(menu)
//         })
//
//
//     } catch (e) {
//
//         console.log(e)
//     }
// });

app.get('/api/availableMenu', function (req, res) {
    // res.send('hello0 world')
    console.log(req)
    AvailableMenu.getAvailableMenu(function (err, menu) {
        if (err) {
            throw err;
        }
        res.json(menu)
    })
});


// OrderStore requests
// Do I NEED POST?

app.post('/api/orderStore', function (req, res) {
    // res.send('hello0 world')
    var order = req.body;
    // console.log("priletelo")
    // console.log(order)
    //
    // console.log(JSON.stringify(order))


    try {
        OrderStore.addOrder(order, function (err, order) {
            // console.log('new')
            // console.log(order)
            if (err) {
                // console.log(err)
                throw err;
            }
            res.json(order)
        })
    } catch (e) {
        console.log(e)
    }
});

app.put('/api/orderStore/:email', function (req, res) {
    // const date = req.params.date
    const email = req.params.email
    const order = req.body;
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // res.json(req.body)
    console.log(date)

    // console.log(email)
    OrderStore.updateOrder(date, email, order, {upsert: true }, function (err, response) {
        console.log("UPDATE RESPONSE")
        console.log(response)
        if (err) {


            console.log("ОШИБКА")

            console.log(err)

            throw err;
        } else {

            res.json(order)
            console.log(order)
        }
    })


});


app.get('/api/orderStore/:email',  (req, res)=> {
    const email = req.params.email
    try {
        OrderStore.getOrderListByEmail(email, (err, docs) => {
            if (err) {
                throw err;
            }
            console.log(email)
            console.log(docs)
            res.json(docs)
        })
        // console.log(docs)
        // res.json(res)
        // res.json(res)
    } catch (e) {
        console.log(e)
    }

});

app.get('/api/orders/:date', function (req, res) {
    const date = req.params.date
    try {
        OrderStore.getOrderListByDate(date, (err, docs) => {
            if (err) {
                throw err;
            }
            console.log(date)
            console.log(docs)
            res.json(docs)
        })
        // console.log(docs)
        // res.json(res)
        // res.json(res)
    } catch (e) {
        console.log(e)
    }

});


app.listen(5000, function () {
    console.log('API app started')
})



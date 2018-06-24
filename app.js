let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express()


let jwt = require('jsonwebtoken');

OrderStore = require('./models/orderStore');
AvailableMenu = require('./models/availableMenu');
Users = require('./models/users');

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept, Authorization'); // add remove headers according to your needs
    next()
})

mongoose.connect('mongodb://localhost/orderDb', function (err, client) {
    console.log("Connected successfully to server");
});


// let db = mongoose.connection
// console.log(db)

app.get('/', function (req, res) {
    res.send('NOTHING HERE')
    // res.send('Please use /api/books or /api/asdas')
});

//Users actions

// app.put
app.post('/api/users', function (req, res) {

    let user = req.body;
    user.token = jwt.sign({user}, 'alex', {}, (err, token) => {
        res.send(token)
    });
    try {
        console.log(user)
        Users.addUsers(user, function (err, callback) {
            if (err) {
                console.log(err)
                throw err;
            }
        })
    } catch (e) {
        console.log(e)
    }
});

app.get('/api/useremail', verifyToken, (req, res) => {
    jwt.verify(req.token, 'alex', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            console.log(authData.user.email);
            Users.getUsersByEmail(authData.user.email, function (err, docs) {
                if (err) {
                    throw err;
                }
                res.json(
                    {
                        email: authData.user.email,
                        emailVerified: docs.emailVerified,
                        balance: docs.balance
                    }
                )
            })
        }
    });
});

app.get('/api/users', function (req, res) {
    Users.getUsers(function (err, docs) {
        if (err) {
            throw err;
        }
        res.json(docs)
    })
});

app.get('/api/user/:email', function (req, res) {
    const email = req.params.email
    Users.getUsersByEmail(email, function (err, docs) {
        if (err) {
            throw err;
        }
        res.json(docs)
    })
});


app.get('/api/users/:id', function (req, res) {
    const id = req.params.id
    Users.getUsersById(id, function (err, docs) {
        if (err) {
            throw err;
        }
        res.json(docs)
    })
});


app.put('/api/users/:id', function (req, res) {
    const id = req.params.id
    let user = req.body;
    Users.updateUsersBalance(id, user, function (err, docs) {
        if (err) {
            throw err;
        }
        res.json(docs)
    })
});

app.put('/api/users/verify/:email', function (req, res) {
    const email = req.params.email
    console.log(req.params.email)
    Users.updateUsersVerification(email, function (err, docs) {
        if (err) {
            throw err;
        }
        res.json(docs)
    })
});
// available Menu Requests

app.get('/api/availableMenu/:date', function (req, res) {
    const date = req.params.date
    AvailableMenu.getAvailableMenuByDate(date, function (err, docs) {
        if (err) {
            throw err;
        }
        res.json(docs)
    })
});

app.put('/api/availableMenu/:date', function (req, res) {
    const date = req.params.date
    const menu = req.body;
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

app.put('/api/orderStore/:email', function (req, res) {
    // const date = req.params.date
    const email = req.params.email
    const order = req.body;
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    OrderStore.updateOrder(date, email, order, {upsert: true}, function (err, response) {
        if (err) {
            console.log(err)
            throw err;
        } else {
            res.json(order)
            console.log(order)
        }
    })
});


app.get('/api/orderStore/:email', (req, res) => {
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
    } catch (e) {
        console.log(e)
    }
});

app.get('/api/orderStore/current/:email', (req, res) => {
    const email = req.params.email
    try {
        OrderStore.getCurrentOrderByEmail(email, (err, docs) => {
            if (err) {
                throw err;
            }
            console.log(email)
            console.log(docs)
            res.json(docs)
        })
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
    } catch (e) {
        console.log(e)
    }
});

function verifyToken(req, res, next) {
    console.log("procerka");

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        console.log("etap2")
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(5000, function () {
    console.log('API app started')
})



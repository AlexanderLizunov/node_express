var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express()

Genre = require('./models/genres');
AvailableMenu = require('./models/availableMenu');

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
console.log(db)

app.get('/', function (req, res) {
    // res.send('hello0 world')


    res.send('Please use /api/books or /api/asdas')
});



app.get('/api/availableMenu/:date', function (req, res) {
    const date = req.params.date
    console.log(date)
    console.log(req)
    AvailableMenu.getAvailableMenuByDate(date,function (err, docs) {
        if (err) {
            throw err;

        }
        res.json(docs)
    })
    // res.send('Please use /api/books or /api/asdas')
});



app.put('/api/availableMenu/:date', function (req, res) {
    const date = req.params.date
    const menu= req.body;
    console.log(date)
    AvailableMenu.updateMenu(date,menu,{}, function(err, response) {
        if (err) {
            console.log(err)
            throw err;
        }else if(response===null){
            AvailableMenu.addAvailableMenu(req.body, function(err, menu) {
                console.log('new')
                console.log(menu)
                if (err) {
                    console.log(err)


                    throw err;
                }

                res.json(menu)
            })
        console.log(menu)
        }
        res.json(menu)
    })
});

app.post('/api/availableMenu', function (req, res) {
    // res.send('hello0 world')
    var menu= req.body;
    // res.send(menu)
    console.log("priletelo")
    console.log(menu)

    console.log(JSON.stringify(menu))

    try{
    AvailableMenu.addAvailableMenu(menu, function(err, menu) {
        console.log('new')
        console.log(menu)
        if (err) {
            console.log(err)
            throw err;
        }

        res.json(menu)
    })

    }catch(e)
    {

        console.log(e)
    }
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





app.get('/api/genres', function (req, res) {
    // res.send('hello0 world')
    Genre.getGenres(function (err, genres) {
        if (err) {
            throw err;
        }
        res.json(genres)
    })
});


app.post('/api/genres', function (req, res) {
    // res.send('hello0 world')
    var genre= req.body;
    Genre.addGenre(genre, function(err, genre) {
        if (err) {
            console.log(err)
            throw err;
        }
        res.json(genre)
    })
});

app.put('/api/genres/:_id', function (req, res) {
    var id = req.params._id
    var genre= req.body;
    Genre.updateGenre(id,genre,{}, function(err, genre) {
        if (err) {
            console.log(err)
            throw err;
        }
        console.log(genre)
        res.json(genre)
    })

});




app.get('/api/books/:_id', function (req, res) {
    console.log('booksearbyid')
    Book.getBookById(req.params._id, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book)
    })
});





app.delete('/api/genres/:_id', function (req, res) {
    var id = req.params._id
    Genre.removeGenre(id, function(err, genre) {
        if (err) {
            console.log(err)
            throw err;
        }
        res.json(genre)
    })
});

app.delete('/api/books/:_id', function (req, res) {
    var id = req.params._id
    Book.removeBook(id, function(err, genre) {
        if (err) {
            console.log(err)
            throw err;
        }
        res.json(genre)
    })
});


// app.listen(8080);
app.listen(5000, function () {
    console.log('API app started')
})
// console.log('running on port 3000')
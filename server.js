//*******************DEPENDENCIES********************/
const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Player = require('./models/playerSchema')
const app = express();
const playerSeed = require('./models/seed')
let PORT = 3000;
const session = require('express-session')
const bcrypt = require('bcrypt')
// const hashedString = bcrypt.hashSync('yourStringHere', bcrypt.genSaltSync(10))
// bcrypt.compareSync('yourGuessHere', hashedString)
require('dotenv').config()
const mongodbURI = process.env.MONGODBURI

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

//***********************DATABASE**********************/
// Seed Route
app.get('/seed', (req, res) => {
    Player.create(playerSeed, (err, data) => {
        res.send(data)
    })
})

//**********************SESSIONS**********************/
app.use(
    session({
      secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
      resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
    })
)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

const userController = require('./controllers/users_controller.js')
app.use('/users', userController)

app.get('/any', (req, res) => {
//any route will work
req.session.anyProperty = 'any value'
})

app.get('/retrieve', (req, res) => {
    //any route will work
    if (req.session.anyProperty === 'something you want it to') {
      //test to see if that value exists
      //do something if it's a match
      console.log('it matches! cool')
    } else {
      //do something else if it's not
      console.log('nope, not a match')
    }
    res.redirect('/')
})

app.get('/update', (req, res) => {
    //any route will work
    req.session.anyProperty = 'changing anyProperty to this value'
    res.redirect('/')
})

app.get('/destroy-route', () => {
    //any route will work
    req.session.destroy(err => {
      if (err) {
        //do something if destroying the session fails
      } else {
        //do something if destroying the session succeeds
      }
    })
    res.redirect('/')
})

//************************ROUTES**********************/
//Create - New Signed Player
app.get('/gm/new', (req, res) => {
    res.render('new.ejs', {
        currentUser: req.session.currentUser
    })
})

//Create - New Free Agent
app.get('/gm/newfa', (req, res) => {
    res.render('new-free-agent.ejs', {
        currentUser: req.session.currentUser
    })
})

//Create - Post (Roster)
app.post('/roster', (req, res) => {
    if(req.body.contract === 'on') {
        req.body.contract = true;
    } else {
        req.body.contract = false;
    }
    if(req.body.starter === 'on') {
        req.body.starter = true;
    } else {
        req.body.starter = false;
    }
    Player.create(req.body, (err, data) => {
            res.redirect('/roster');
    })
})

//Create - Post Free Agent
app.post('/fa', (req, res) => {
    Player.create(req.body, (err, data) => {
            res.redirect('/fa', {
                currentUser: req.session.currentUser
            });
    })
})

// Landing Page
app.get('/', (req, res) => {
        res.render('landing.ejs')
})

// Read Route - Home Index
app.get('/home', (req, res) => {
    Player.find({}, (err, player) => {
        res.render('index.ejs', {players:player, currentUser: req.session.currentUser})
    })
})

// Read Route - Roster Index
app.get('/roster', (req, res) => {
    Player.find({}, (err, player) => {
        res.render('roster.ejs', {players:player, currentUser: req.session.currentUser})
    })
})

// Read Route - Free Agent Index
app.get('/fa', (req, res) => {
    Player.find({}, (err, player) => {
        res.render('free-agents.ejs', {players:player, currentUser: req.session.currentUser})
    })
})

// Read Route - Bench Index
app.get('/bench', (req, res) => {
    Player.find({}, (err, player) => {
        res.render('bench.ejs', {players:player, currentUser: req.session.currentUser})
    })
})

//Read Route - Show
app.get('/gm/:id', (req, res) => {
    Player.findById(req.params.id, (err, foundPlayer) => {
        res.render('show.ejs', {players: foundPlayer, currentUser: req.session.currentUser})
    })
})

//Update - Edit
app.get('/gm/:id/edit', (req, res) => {
    if(req.body.contract === 'on') {
        req.body.contract = true;
    } else {
        req.body.contract = false;
    }
    if(req.body.starter === 'on') {
        req.body.starter = true;
    } else {
        req.body.starter = false;
    }
    Player.findById(req.params.id, (err, foundPlayer)=>{ 
        res.render('edit.ejs', {players: foundPlayer, currentUser: req.session.currentUser})
    })
})

//Update - Post
app.put('/gm/:id', (req, res) => {
    if(req.body.contract === 'on') {
        req.body.contract = true;
    } else {
        req.body.contract = false;
    }
    if(req.body.starter === 'on') {
        req.body.starter = true;
    } else {
        req.body.starter = false;
    }
    console.log(req.body)
    Player.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPlayer)=>{
        console.log(updatedPlayer)
        res.redirect('/roster');
    })
})

//Delete - Retire Player
app.delete('/gm/:id', (req, res) => {
    Player.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/roster')
    })
})

//Search bar
app.post('/results/', (req, res) => {
    Player.find(req.body, (err, foundPlayer) => {
        res.render('results.ejs', {players: foundPlayer, currentUser: req.session.currentUser})
    })
})

//**********************LISTENERS********************/
if(process.env.PORT){
	PORT = process.env.PORT
}
app.listen(PORT, () => {
    console.log('listening...')
})

mongoose.connect('mongodb+srv://patrick_murphy926:eN1SDzhW9Scm7M9u@cluster0.rwwd1w6.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo')
})
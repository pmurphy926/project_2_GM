//*******************DEPENDENCIES********************/
const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Player = require('./models/playerSchema')
const app = express();
const playerSeed = require('./models/seed')
let PORT = 3000;

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

//************************ROUTES**********************/
//Create - New Signed Player
app.get('/gm/new', (req, res) => {
    res.render('new.ejs')
})

//Create - New Free Agent
app.get('/gm/newfa', (req, res) => {
    res.render('new-free-agent.ejs')
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

//Create - Post (Free Agent)
app.post('/fa', (req, res) => {
    Player.create(req.body, (err, data) => {
            res.redirect('/fa');
    })
})

// Read Route - Home Index
app.get('/', (req, res) => {
    Player.find({}, (err, player) => {
        res.render('index.ejs', {players:player})
    })
})

// Read Route - Roster Index
app.get('/roster', (req, res) => {
    Player.find({}, (err, player) => {
        res.render('roster.ejs', {players:player})
    })
})

// Read Route - Free Agent Index
app.get('/fa', (req, res) => {
    Player.find({}, (err, player) => {
        res.render('free-agents.ejs', {players:player})
    })
})

// Read Route - Bench Index
app.get('/bench', (req, res) => {
    Player.find({}, (err, player) => {
        res.render('bench.ejs', {players:player})
    })
})

//Read Route - Show
app.get('/gm/:id', (req, res) => {
    Player.findById(req.params.id, (err, foundPlayer) => {
        res.render('show.ejs', {players: foundPlayer})
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
        res.render('edit.ejs', {players: foundPlayer})
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
        res.render('results.ejs', {players: foundPlayer})
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
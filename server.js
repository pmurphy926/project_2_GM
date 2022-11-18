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

//Read Route - Show
app.get('/gm/:id', (req, res) => {
    Player.findById(req.params.id, (err, foundPlayer) => {
        res.render('show.ejs', {players: foundPlayer})
    })
})

//Update - Edit
app.get('/gm/:id/edit', (req, res) => {
    Player.findById(req.params.id, (err, foundPlayer)=>{ 
        res.render('edit.ejs', {players: foundPlayer})
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
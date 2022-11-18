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
// Read Route - Index
app.get('/gm', (req, res) => {
    Player.find({}, (err, player) => {
        res.render('index.ejs', {players:player})
    })
})

//*******************SITE FUNCTIONS*******************/
function myFunction(x) {
    x.classList.toggle("change");
  }

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
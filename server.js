//*******************DEPENDENCIES********************/
const express = require('express');
const mongoose = require('mongoose')
const app = express();

let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

app.get('/', (req, res) => {
    res.send('hi')
})

app.listen(PORT, () => {
    console.log('listening...')
})

mongoose.connect('mongodb+srv://patrick_murphy926:eN1SDzhW9Scm7M9u@cluster0.rwwd1w6.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo')
})
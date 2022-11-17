//*******************DEPENDENCIES********************/
const express = require('express');
const app = express();

let PORT = 3003;
if(process.env.PORT){
	PORT = process.env.PORT
}

app.get('/', (req, res) => {
    res.send('hi')
})

app.listen(3000, () => {
    console.log('listening...')
})
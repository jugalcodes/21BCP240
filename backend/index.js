const express = require("express");
const app = express();

require('dotenv').config();  // config is neccessary to access the configuartion mentioned in the .env file
require('./models/database.js')  // way of import the file into index.js file  

const PORT = process.env.PORT || 8080;  // here if the .env disrupts then by default it will access 8080 as port address
const todoRouter = require('./routes/todoRouter.js');
const bodyParser = require("body-parser");
const cors = require('cors');

app.get('/', (req, res) => {
    res.send("Hello ji from Backend Server");
})

//MIDDLEWARE
app.use(cors({ origin: 'https://21-bcp-240-front.vercel.app/' })) // here as our server is running on different local add and frontend on different so this cross origin allows frontend to access server from any port number
app.use(bodyParser.json()) // in order to make json data from client side other wise middleware wont accept it
app.use('/todos', todoRouter) //middleware
 
app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`)
})

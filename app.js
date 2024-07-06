const express = require("express");
const cors = require("cors");
const app = express()

const http = require("http").Server(app);
app.use(cors({
    origin: '*'
  }));
const io = require("socket.io")(http,  {
    pingInterval: 15000, // Ping every 15 seconds
  pingTimeout: 30000,  // Wait 30 seconds for the client to respond to pings
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  }
  
  });

// //for customer
const userauth = require('./route');

//conncetdb
const mongoose = require('mongoose');
const { connectio } = require("./socket");
const base = 'mongodb+srv://emmaro:1234@tutorial.klpqo.mongodb.net/chat2?retryWrites=true&w=majority'
const coonectdb = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(base)
.then((result) => console.log('base connetced'))
.catch((err) => console.log(err))
}
coonectdb ()

//applying our middleware

//applying our middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = '/user'
const admin = '/admin'
//for customer
app.use(user, userauth )



//error handler
app.use((req, res, next) => {
  const error = new Error("api not found");
  error.status = 404;
  res.status(404).json({
    status_code: 404,
    status: false,
    message: error.message,
    data: [],
    error: error.message,
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.status(500).json({
    status_code: 500,
    status: false,
    message: error.message,
    data: [],
    error: error.message,
  });
});



const port =  5000;

http.listen(port, () => console.log("coonected"));
connectio(io)


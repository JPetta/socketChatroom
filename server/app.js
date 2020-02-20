var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let cors = require('cors');

app.use(cors())

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


let roomOne = io.of('/one')
let usersOne = []
let messagesOne = []
roomOne.on('connection', function(socket){
    console.log('someone connected to room one')
    socket.on("login", function(user){
        console.log('masuk login room one')
        console.log(user)
        usersOne.push(user)
        console.log(usersOne)
        roomOne.emit("newUser", usersOne)
    })
    socket.on('sendMessage', function(payload){
        console.log('masuk ke sendMessage room one')
        messagesOne.push(payload)
        roomOne.emit('newMessage', messagesOne)
    })
})

let roomTwo = io.of('/two')
let usersTwo = []
let messagesTwo = []
roomTwo.on('connection', function(socket){
    console.log('someone connected to room two')
    socket.on('login', function(user){
        usersTwo.push(user)
        console.log('array users two: ')
        console.log(usersTwo)
        roomTwo.emit('newUser',usersTwo)
    })
    socket.on('sendMessage', messages=>{
        console.log('someone sent a message on two')
        console.log(messages)
        messagesTwo.push(messages)
        roomTwo.emit('newMessage', messagesTwo)
    })
})

let roomThree = io.of('/three')
let usersThree = []
let messagesThree = []
roomThree.on('connection', function(socket){
    console.log('someone connected to room two')
    socket.on('login', function(user){
        usersThree.push(user)
        console.log('array users two: ')
        console.log(usersThree)
        roomTwo.emit('newUser',usersThree)
    })
    socket.on('sendMessage', messages=>{
        console.log('someone sent a message on two')
        console.log(messages)
        messagesThree.push(messages)
        roomTwo.emit('newMessage', messagesThree)
    })
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
const express = require('express');
const app = express();

app.use(express.static('public'));

const socket = require('socket.io');

const server = app.listen(process.env.PORT || 3000);

const io = socket(server);

const arr = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {

    io.to(socket.id).emit('prev-rooms',{
        rooms: arr
    })


    console.log(socket.id)
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) =>{
        socket.broadcast.emit('typing', data);
    });

    socket.on('create', (data) =>{
        pushToArray(data);
        io.sockets.emit('create', data);
    });

    
});


function pushToArray(data){
    arr.push(data.name);
    console.log(arr);
}
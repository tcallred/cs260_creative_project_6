module.exports = function(io) {
    io.on('connection', function(socket) {
        console.log('a user connected');
        socket.on('chat message-left', function(msg) {
            console.log('message: ' + msg);
            io.emit('chat message-left', msg);
        });
        socket.on('chat message-right', function(msg) {
            console.log('message: ' + msg);
            io.emit('chat message-right', msg);
        });

    });
}
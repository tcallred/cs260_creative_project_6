module.exports = function(io) {
    var topics = ["Spoons are useless.", "Ice cream shaped like spaghetti is actually appetizing.",
        "A vampire would beat a basilisk in a fight.", "Platypus are adorable.",
        "Trees could one day be sentient.", "Catnip should be illegal for cats.", "Cats are better than dogs.", "Breakfast cereal should be classified as soup.",
        "Beards should be allowed on campus.", "Astros are better than Dodgers.", "Pizza is good with pineapple.", "Cheese is the greatest food in the world.",
        "Pirates are better than ninjas", "BYU Dating culture is amazing!", "Marvel is better than DC", "Electrical Engineering is better than Mechanical Engineering"
    ];

    var todaysTopic = topics[Math.floor(Math.random() * topics.length)]

    io.on('connection', function(socket) {
        socket.emit('new topic', todaysTopic);
        console.log('a user connected');
        socket.on('chat message-left', function(usr, msg) {
            console.log('message: ' + usr + " " + msg);
            io.emit('chat message-left', usr, msg);
        });
        socket.on('chat message-right', function(usr, msg) {
            console.log('message: ' + usr + " " + msg);
            io.emit('chat message-right', usr, msg);
        });
    });

    var changeTopic = function() {
        todaysTopic = topics[Math.floor(Math.random() * topics.length)];
        io.emit('new topic', todaysTopic);
    }
    setInterval(changeTopic, 90000);
}
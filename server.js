import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express()


const httpServer = createServer(app);
const port = 3000;
const io = new Server(httpServer, {
    cors: {
      origin: '*',
    }
});

app.use("/", express.static("./client"))

app.get("/", (req, res)=>{
    res.send(users);

})

const users = {}




app.get('/happy', function (req, res) {
  res.send({ link: "https://media1.giphy.com/media/Rpm7zINbHhG3YsXi7g/giphy.gif?cid=ecf05e47el2y4d0nagdkdafh3dnhfzlilnbwr8aqkhhpiynk&rid=giphy.gif&ct=g" });
});
app.get('/serena', function (req, res) {
  res.send({ link: "https://media0.giphy.com/media/GZJazQwLbKyHKkHPXx/200w.gif?cid=ecf05e47ltftwypqa2vie73nudtf56su6bys3r5y2madq0tp&rid=200w.gif" });
});
app.get('/goodnight', function (req, res) {
  res.send({ link: "https://media2.giphy.com/media/mguPrVJAnEHIY/200.gif?cid=ecf05e47zxyknyxggdt1tl7uh5v770c7fv2o1m9ncf8onzw4&rid=200.gif&ct=g" });
});
app.get('/sad', function (req, res) {
  res.send({ link: "https://media2.giphy.com/media/VVnnrNCNHi2uPVewbe/giphy.gif?cid=ecf05e47bp7x11mubgqv5fd0jihefgud8kmy8dsnbu3skukz&rid=giphy.gif&ct=g" });
});
io.on('connection', socket => {
    
   // New User
  socket.on('new user', function (data, callback) {
    callback(true);
    console.log("new user")
    socket.name = data;
    updateUsernames();
  });
       
    //Send Message

  socket.on('send message', function (data) {
    io.sockets.emit('new message', { msg: data, user: socket.name });
   
  });
  
 
    socket.on('disconnect', () => {
     
     // delete users[socket.name]
      //console.log(" user left"); 
      io.sockets.emit('new message', { user: socket.name });
    })
    console.log (`disconnect`)


    function updateUsernames() {
        io.sockets.emit('get users', users);
      }
    
  })

const convertRoomMap = () => {
    /* 

    // NOTE: Alla ? skall ersättas med korrekt kod

    // Gör om map till en array med arrayer
    const convertedArray = Array.from(io.sockets.adapter.rooms)

    // Filtrera bort samtliga sockets
    const filteredRooms = convertedArray.filter(room => ?.has(?))

    // Plocka ut rum med socketIDs
    const roomsWithSocketID = filteredRooms.map((roomArray) => {
        return {room: ?, sockets: Array.from(?)}
    })

    // Plocka ut rum med socketIDs och nicknames
    const roomsWithIdsAndNickname = roomsWithSocketID.map((roomObj) => {
        const nicknames = roomObj.sockets.map((socketId) => {
            return { id: socketId, nickname: io.sockets.sockets.get(?).? }
        })
        return {room: roomObj.room, sockets: nicknames}
    })

    return roomsWithIdsAndNickname

    */
}

httpServer.listen(port, () => {
    console.log("Server is running on port " + port);
})


/*  

socket.emit('message', "this is a test"); //sending to sender-client only

socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender

socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender

socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)

socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid

io.emit('message', "this is a test"); //sending to all clients, include sender

io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender

io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender

socket.emit(); //send to all connected clients

socket.broadcast.emit(); //send to all connected clients except the one that sent the message

socket.on(); //event listener, can be called on client to execute on server

io.sockets.socket(); //for emiting to specific clients

io.sockets.emit(); //send to all connected clients (same as socket.emit)

io.sockets.on() ; //initial connection from a client.

*/
//function to register logged in users to our logged in users

const connectio = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');
        const roomid = '12345'
        socket.on('join', () => {
            console.log('socketjoin :' , socket.id)
          socket.join(roomid);
          socket.to(roomid).emit('user-connected', socket.id)
        });
      
        socket.on('message', (data) => {
            console.log('working' , data)
            // Assuming 'data' includes 'type' and 'sdp' or other necessary signaling data
            if (data.type === 'offer' || data.type === 'answer' || data.type === 'candidate') {
              io.to(roomid).emit('message', data); // Broadcast 'message' to all clients in the room
            }
          });
      
        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });
      
 }



module.exports = {
    connectio 
}
module.exports = () => {

const url = require('url');
const path = require('path');

// Load Express Module
  express = require('express');
  app 	= express();
  http = require('http').Server(app);
  io = require('socket.io')(http);


  // Load Body Parser Module
  bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.use(express.static(path.join(__dirname, 'dist/hal5000/')));

app.get('/', function(req, res){
//  res.sendFile(__dirname + '/dist/hal5000/index.html');
 res.sendFile( url.format({
         pathname: path.join(__dirname, 'dist/hal5000/index.html')
        }));
  //res.send(' Socket IO: port:5000 ');
});

io.on('connection', function(socket){

  console.log('a user connected');
  //console.log("SOCKET IO connected");

  socket.on('message', function (data) {
       console.log(data);
       console.log(data.message);

         // socket.emit('message', videos_a );

  });
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});

}
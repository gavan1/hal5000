module.exports = () => {

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const url = require('url');
const path = require('path');

app.get('/', function(req, res){
//  res.sendFile(__dirname + '/dist/hal5000/index.html');
 res.sendFile( url.format({
         pathname: path.join(__dirname, 'dist/hal5000/index.html')
        }));
  //res.send(' Socket IO: port:5000 ');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});

}
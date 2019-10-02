var express=require('express');
var socket=require('socket.io');
//app setup`
var app=express();
var server=app.listen(5000,function()
{
  console.log('it is working properly');
});

//static files and pu8blic files
app.use(express.static('public'));
app.get('/',function(request,response)
{
  response.sendfile('/public/index.html');
});
//socket setup
var io=socket(server);
var chat_infra=io.of("/chat_infra").on('connection', function(socket){
  console.log('made connection in socket',socket.id);
  socket.emit('welcome', {
    free:'welcome to the most amazing chatting app in this earth'
  });
  socket.on('disconnect', function()
{
  console.log("the user got disconnected");
});
socket.on('setname', function(data)
{
  socket.broadcast.emit('setuser',data);
});
socket.on('changename', function(data)
{
  socket.broadcast.emit('changeuser',data);
});
});
//coding of chat message using namespace
var chat_got=io.of("/chat_got").on('connection', function(socket)
{
  console.log('made connection in socket',socket.id);
  socket.on('chat',function(data)
{
  socket.broadcast.emit('chat',data);
  console.log(data);
});
//typing message
socket.on('typing',function(data)
{
  socket.broadcast.emit('typing', data);
});

//send the image to all user

socket.on('image', function(data)
{
  socket.broadcast.emit('image', data);
  console.log(data);
});

/*socket.on('video', function(data)
{
  io.sockets.emit('video', data);
});*/
});
/*coding using io
io.on('connection',(socket)=>
{
  console.log('made connection in socket',socket.id);
  socket.on('chat',function(data)
{
  socket.broadcast.emit('chat',data);
  console.log(data);
});
//typing message
socket.on('typing',function(data)
{
  socket.broadcast.emit('typing', data);
});

//send the image to all user

socket.on('image', function(data)
{
  socket.broadcast.emit('image', data);
  console.log(data);
});

socket.on('video', function(data)
{
  io.sockets.emit('video', data);
});
});*/

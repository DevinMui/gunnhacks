var Twitter = require('twitter');
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http);

app.use(express.static('./'))
var client = new Twitter({
  consumer_key: 'dRlAYU0fDOPpAWSGFz3DqTkLx',
  consumer_secret: 'PDTKVEwwrFlMS32u9kEaVie7LAFxoNwR17e2uPQCX7Tyk8lvRI',
  access_token_key: '2840635218-0AVHHUVcIvRePwSCRfcRhsPLlpa7ndbIsWUTKEM',
  access_token_secret: 'aSLZPfWqVNdFhmbrTtGBNdXUBCYFgArMjZ012yUppcKIS'
});

client.stream('statuses/filter', {track: 'wall'}, function(stream) {
  stream.on('data', function(event) {
    console.log(event && event.text);
    io.emit('msg', event.txt);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});

app.get('/', function(req, res){
	res.sendfile('index.html')
})

http.listen(3000)
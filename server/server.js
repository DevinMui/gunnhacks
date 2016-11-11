var express = require('express')
var api = require('instagram-node').instagram()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var ejs = require('ejs')
var compression = require('compression')
var app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression()) // gzip compression less data

mongoose.connect('mongodb://localhost/gunn')

var dataSchema = new mongoose.Schema({
	lat: Number,
	long: Number,
	name: String,
	post: String,
	pic: String
},
{
	timestamps: true
})

var Data = mongoose.model('Data', dataSchema)

app.get('/', function(req, res){
	Data.find({}, function(err, datas){
		res.send(datas) // im fucking lazy
	})
})

app.post('/data', function(req, res){
	var data = Data({
		lat: req.body.lat,
		long: req.body.long,
		name: req.body.name,
		post: req.body.post,
		pic: req.body.pic	
	})
	data.save(function(err, data){
		if(err) res.send("fuck")
		res.send(data)	
	})
	
})

app.listen(3000)
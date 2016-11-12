var express = require('express')
// var api = require('instagram-node').instagram()
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
	pic: String,
	ig: Boolean,
	tw: Boolean
},
{
	timestamps: true
})

var userSchema = new mongoose.Schema({
	email: String,
	following: [ String ]
},{
	timestamps: true
})

var followSchema = new mongoose.Schema({
	name: { type: String, unique: true, lowercase: true } 
})

var Follow = mongoose.model('Follow', followSchema)

var User = mongoose.model('User', userSchema)

var Data = mongoose.model('Data', dataSchema)

// api parts; todo: ejs
app.get('/', function(req, res){
	Data.find({}, function(err, datas){
		res.json(datas) // im fucking lazy
	})
})

app.post('/get_follow', function(req, res){
	Data.find({ name: req.body.name }, function(err, datas){
		if(err) res.json({"err": err})
		res.json(datas)
	})
})

app.post('/user', function(req, res){
	var user = new User({
		email: req.body.email,
		following: []
	})
	user.save(function(err, user){
		if(err) res.json({"err": err})
		res.json("success")
	})
})

// this is for the users followers
app.post('/follow', function(req, res){
	User.findOne({"email": req.body.email}, function(err, user){
		if(err) res.json({"err": err})
		user.following += req.body.following
		User.update({"email": req.body.email}, user, function(err, user){
			if(err) res.json({"err": err})
			follow = new Follow({ name: req.body.following }).save(function(err, follow){
				if(err) res.json({"err": err})
				res.json("success")
			})
		})
	})
})

// data from python script that scrapes instagram/twitter
app.post('/data', function(req, res){
	var data = Data({
		lat: req.body.lat,
		long: req.body.long,
		name: req.body.name,
		post: req.body.post,
		pic: req.body.pic,
		ig: req.body.ig,
		tw: req.body.tw
	})
	data.save(function(err, data){
		if(err) res.json({"err": err})
		res.json("success")	
	})
})

app.listen(3000)
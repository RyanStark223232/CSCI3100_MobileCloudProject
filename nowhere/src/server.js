// Name: Chiu Chi Keung
// SID: 1155109788
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


mongoose.set('useCreateIndex', true);
// const url = 'mongodb://s1155109788:x71714@localhost/s1155109788'
const url = 'mongodb://127.0.0.1:27017/'
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true } );

var Schema = mongoose.Schema;
var db = mongoose.connection;


// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));

// Upon opening the database successfully
db.once('open', function() {
  console.log("Connection is open...");
});

app.use(bodyParser.urlencoded({
  extended: false
}));


//set up schema
var LocationSchema = Schema({
  locId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    reuqired: true
  },
  quota: {
    type: Number
  }
});

//set up schema
var EventSchema = Schema({
  eventId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  loc:{
    type: Schema.Types.ObjectId, ref:'Location'
  },
  quota: {
    type: Number
  }
});



//set up collections
var Event = mongoose.model('Event', EventSchema);
var Location = mongoose.model('Location', LocationSchema);



app.get('/event/:eventId' , function(req,res){
  Event.findOne(
    {eventId: req.params['eventId']},
    'name loc quota',
    function(err, event){
      if (err) {
        res.send(err);
        return;
      }
      if(event != null){
        Location.findOne(
          {_id: event.loc},
          'locId name',
          function(err, location){
            if (err) return handleError(err);

            console.log("\nEvent Name: "+ event.name + "\nEvent Location: "+ location.locId +
            "\nLocation Name: "+ location.name + "\nEvent Quota: "+ event.quota);

            res.send("Event Name: "+ event.name + "<br>Event Location: "+ location.locId +
            "<br>Location Name: "+ location.name + "<br>Event Quota: "+ event.quota )
          }
        )
      }else{
        res.send("The given event ID is not found.");
        console.log("The given event ID is not found.");
      }

    }
  )
});


app.post('/event',function(req,res){
  const get_eventId= Event.findOne({},'eventId').sort({eventId:-1}).limit(1);
  var event_id;
  get_eventId.exec(function(err,event){
    event_id = event.eventId+1;
    Location.findOne({locId: req.body['loc']},function(err, location){
      if(location.quota >= parseInt(req.body['quota']) ){
        var e = new Event({eventId: event_id, name: req.body['name'], loc: location._id, quota: req.body['quota']});
        e.save(function(err){
          if (err) {
            res.send(err);
            return;
          }
        });
        var event_url = req.protocol + '://' + req.get('host') + req.originalUrl + "/"+event_id;
        // I found the status and header sent properly at chrome developer console mode,
          // but have to close the developer console mode to see the content of chrome website due to
            // "indicate whether to send a cookie in a cross-site request by specifying its samesite attribute"
        res.status(201).set({'Location':event_url}).send("Event created!<br>"
        	+ "Event Name: " + req.body['name'] + "<br>Event Id: " + event.eventId +"<br>Event Location: "
        	+ location.locId + "<br>Event Quota: "+ req.body['quota']);
      }else{
        res.send("Event cannot be created due to the quota limitation of the location");
        console.log("Event cannot be created due to the quota limitation of the location");

      }
  	});
  });
});


app.delete('/event/:eventId',function(req,res){
  Event.deleteOne({eventId: req.params['eventId']},function(err, del){
    if(err){
      res.send(err);
      return;
    }
    if(Object.keys(del).length != 0 ){
      res.send("Event "+ del.eventId +" is deleted successfully!");
    }else{
      res.send("The event ID is not found")
    }
  });

});




app.get('/event',function(req,res){
  Event.find({},function(err,event){
    if(err){
      res.send(err);
      return;
    }
    var output ="";
    event.forEach(function(arrayItem){
      output+="Event Id:"+ arrayItem.eventId + ", Name: "+arrayItem.name +", Location _id: "+arrayItem.loc+  ", Quota: " +arrayItem.quota +"<br>";
    });
    res.send(output);
  });
});


app.get('/loc',function(req,res){
  if(req.query['quota'] == null){
    Location.find({},function(err,location){
      if(err){
        res.send(err);
        return;
      }
      var output ="";
      location.forEach(function(arrayItem){
        output+="Location ID:" + arrayItem.locId + ", Name: "+arrayItem.name + ", Quota: "+ arrayItem.quota  +  "<br>";
      });
      res.send(output);
    });
  }else{
    Location.find({quota: {$gte :req.query['quota']}},function(err,location){
      if(err){
        res.send(err);
        return;
      }
      if(Object.keys(location).length != 0 ){
        var output="";
        location.forEach(function(arrayItem){
          output+="Location ID:" + arrayItem.locId + ", Name: "+arrayItem.name + ", Quota: "+ arrayItem.quota  +  "<br>";
        });
        res.send(output);
      }else{
        res.send("There is no location that the quota is greater or equal to "+ req.query['quota']);
      }

    });
  }
});


app.get('/loc/:locId',function(req,res){
  Location.findOne(
    {locId: req.params['locId']},
    function(err,location){
      if(err){
        res.send(err);
        return;
      }
      if(location == null){
        res.send("The location ID is not found");
      }else{
        res.send("Location ID: " +location.locId +"<br>Name: "+location.name +"<br>Quota:"+location.quota);
      }
    });
});


app.post('/loc',function(req,res){
  const get_locId = Location.findOne({},'locId').sort({locId:-1}).limit(1);
  get_locId.exec(function(err,location){
    var l = new Location({locId: location.locId+1, name: req.body['name'], quota: req.body['quota']});

    l.save(function(err){
      if (err) {
        res.send(err);
        console.log(err);
        return;
      }
      //same things happen simliar to  post('/get')
        //"indicate whether to send a cookie in a cross-site request by specifying its samesite attribute"
      res.send("Location created!<br>Location ID: " + l.locId + "<br>Name: "+ l.name +" <br>Quota: "+l.quota);
    });
  });
});




app.all('/*',function(req,res){
  res.send("Hello World!");
});




const server = app.listen(2036);

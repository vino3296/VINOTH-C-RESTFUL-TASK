const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
const app = express();

app.use(bodyParser.urlencoded({
  extended:true
}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/addUser",function(req,res){
  var username = req.body.username;
  var dob = req.body.dob;
  var profession = req.body.profession;
  var obj = {};
  var key = req.body.userid;
  var newuser = {
    "name" : username,
    "dob" : dob,
    "profession" : profession
  }
  obj[key] = newuser;

  fs.readFile("users.json","utf8",function(err,data){
    data = JSON.parse(data);
    data[key] = obj[key];
    console.log(data);
    var updateuser = JSON.stringify(data);
    fs.writeFile("users.json",updateuser,function(err)
    {
      res.end( JSON.stringify(data));
    });
  });
});

app.post("/particularUser",function(req,res){
  fs.readFile("users.json","utf8",function(err,data){
    var users = JSON.parse(data);
    var user = users[req.body.urid];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

app.post("/deleteUser",function(req,res){
  fs.readFile("users.json","utf8",function(err,data){
    data = JSON.parse(data);
    delete data[req.body.uid];
    console.log(data);
    var updateuser = JSON.stringify(data);
    fs.writeFile("users.json",updateuser,function(err)
    {
      res.end(JSON.stringify(data));
    });
  });
});

app.get('/showAll',function(req,res){
  fs.readFile("users.json","utf8",function(err,data){
    console.log(data);
    res.end(data);
  });
});

app.listen(3000,function(){
  console.log("server is running on port 3000");
});
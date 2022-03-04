const express = require("express");
const userModel = require("../models/User");
const app = express();
var ObjectId = require('mongodb').ObjectID;

app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
    console.log(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.put("/update_user/:id", (request, response) => {
  console.log(request.body);
  let doc = {
    type: request.body.type,
  };

  try {
    userModel.findByIdAndUpdate(request.params.id, doc, function(err, raw) {
      if (err) {
        response.send(err);
      }
      response.send({'status':'OK'});
    });
  } catch (error) {
    response.status(500).send(error);
  }
});



app.get("/users", async (request, response) => {
  let reqBody = {}
  if(request && request.query) {
  let id = request.query.id;
  let name = request.query.name;
  let type = request.query.type;
  let source = request.query.source;
  if(id) {
     reqBody._id = id;
  }
  if(name) {
    reqBody.name = name;
  }
  if(type) {
    reqBody.type = type;
  }
  if(source) {
    reqBody.source = source;
  }
}
    const users = await userModel.find(reqBody);
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  module.exports = app;
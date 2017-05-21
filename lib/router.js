import {
  Random
} from "meteor/random";
import Whiteboards from "../lib/whiteboards"
Router.configure({
  layoutTemplate: "layout",
  notFoundTemplate: "404",
  loadingTemplate: "loading"
})

Router.route('/', function() {
  this.render('home');
});

Router.route('/whiteboard/:id', function() {
  Session.set("sessionId", this.params.id);
  this.render('whiteboard');
});
Router.route('/whiteboard/', function() {
  const whiteboardId = Random.id();
  Whiteboards.insert({
    _id: whiteboardId
  })
  Session.set("sessionId", whiteboardId);
  this.redirect('/whiteboard/' + whiteboardId);
});

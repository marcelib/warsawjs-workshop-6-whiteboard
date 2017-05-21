import { Meteor } from "meteor/meteor";

Meteor.publish('Objects', function() {
  return Objects.find();
})

Meteor.publish('Whiteboards', function() {
  return Whiteboards.find();
})

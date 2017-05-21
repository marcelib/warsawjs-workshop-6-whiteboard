import { Meteor } from "meteor/meteor";

Meteor.publish('Objects', function() {
  return Objects.find();
})

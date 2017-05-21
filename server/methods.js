import {
  Meteor
} from 'meteor/meteor';

Meteor.methods({
  clearCanvas: function(passedId) {

    var foundObjects = Objects.find({
      sessionId: passedId
    }).fetch();
    console.log("found" + foundObjects)
    foundObjects.forEachObject(function(obj) {
      Objects.delete(obj);
    })
  }
})

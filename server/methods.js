import {
  Meteor
} from 'meteor/meteor';

Meteor.methods({
  clearCanvas: function(passedId) {

    var foundObjects = Objects.find({
      sessionId: passedId
    }).fetch();
    console.log("found" + foundObjects)
    _.forEach(foundObjects, function(obj) {
      Objects.remove(obj._id);
    })
  }
})

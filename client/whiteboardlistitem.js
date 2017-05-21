Template.home.helpers({
  whiteboards: function() {
    return Whiteboards.find().fetch();
  }
});
Template.whiteboardItem.helpers({
  id: function() {
    console.log("CHU")
    return this._id;
  }
});

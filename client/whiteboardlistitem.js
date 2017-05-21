Template.home.helpers({
  whiteboards: function() {
    return Whiteboards.find().fetch();
  }
});
Template.whiteboardItem.helpers({
  id: function() {
    return this._id;
  }
});

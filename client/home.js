document.title = "Whiteboards";
$('.btn').button();

Template.home.helpers({
    whiteboards: function () {
        return Whiteboards.find().fetch();
    },
    hasName: function () {
        return this.name != null;
    }
});

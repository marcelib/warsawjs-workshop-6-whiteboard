Router.configure({
  layoutTemplate: "layout",
  notFoundTemplate: "404",
  loadingTemplate: "loading"
})

Router.route('/', function () {
  this.render('home');
});

Router.route('/whiteboard', function () {
  this.render('whiteboard');
});

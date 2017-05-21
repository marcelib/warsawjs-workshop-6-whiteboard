Router.route('/', function () {
  this.render('home');
});

Router.route('/whiteboard', function () {
  this.render('whiteboard');
});

Router.route('/canvas', function () {
  this.render('canvas');
});

Router.route('/(.*)', function () {
  this.render('404');
});

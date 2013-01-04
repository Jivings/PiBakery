
/**
 * Module dependencies.
 */

var express     = require('express'),
    routes      = require('./routes'),
    http        = require('http'),
    path        = require('path'),
    bakery      = require('./routes/bakery.js'),
    oven        = require('pi-bake'),
    debug       = require('./routes/debug.js'),
    ingredients = require('./routes/ingredients.js');


require('./cron').start();

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.get('/debug/init', debug.init);
});

app.get('/(index.html)?', routes.index);
app.get('/bakery', bakery.index);


app.get('/ingredients',         bakery.ingredients);
app.post('/ingredients',    ingredients.create);

app.get('/ingredients/all',     ingredients.all);
app.delete('/ingredients/:id',  ingredients.delete);

app.get('/ingredients/:id',     ingredients.get);



//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " 
    + app.get('port'));
});
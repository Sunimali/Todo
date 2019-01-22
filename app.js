var express = require('express');
var toDoController = require('./controllers/todoController');


var app = express();

//set template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//get controllers
toDoController(app);

//listening to port
app.listen(3000);
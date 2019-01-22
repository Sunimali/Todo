var mongoose = require('mongoose');
var bodyParser = require('body-parser');


mongoose.connect('mongodb://test:testing1@ds163054.mlab.com:63054/todos');

var urlencodedParser = bodyParser.urlencoded({extended:false});

var todoSchema = new mongoose.Schema(
    {item: String}
);

var Todo = mongoose.model('Todo',todoSchema);

module.exports = function(app){
    app.get('/todo',function(req, res){

            Todo.find({},function(err,data){

                if(err) throw err;
                res.render('todo',{todos:data});

            });
            
        }

    );

    app.post('/todo',urlencodedParser,function(req, res){
            var newTodo = Todo(req.body).save(function(err,data){

                if(err) throw err;
                res.json({todos: data});
                
            });

         }

    );

    app.delete('/todo/:item',function(req, res){

        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){

            if(err) throw err;
            res.json(data);

        });

        }

    );

}
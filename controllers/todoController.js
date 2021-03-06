var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database

mongoose.connect('mongodb+srv://test:<test>@todo-ut4ua.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
console.log('connected to DB');
//create a schema

var todoSchema = new mongoose.Schema({
    item: String
});
console.log('connected to DB');
var Todo = mongoose.model('Todo', todoSchema);

var itemOne = Todo({item: 'buy flowers'}).save(function(err){
    if(err) throw err;
    console.log('item saved')
});

var data = [{item:'get milk'}, {item: 'walk dog'}, {item:'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});
module.exports = function (app){

app.get('/todo', function(req, res){
    res.render('todo', {todos: data});
});

app.post('/todo', urlencodedParser, function(req, res){
 data.push(req.body);
 res.json(data);
});

app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
        return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
});

};
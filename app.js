
const express = require("express");
const body_parser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");


app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static("p"))

const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',  
  user: 'root',       
  password: '',  
  database: 'todo-list'  
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});


let item_list = [];
let workItems = [];

async function fetchData() {
    return new Promise((resolve) => {
        console.log("fetching data");
        item_list = [];
        const query = 'SELECT items FROM todo_list';
        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            
            results.forEach(element => {
                console.log(element.items);
                item_list.push(element.items);
            });

            resolve(item_list);
        });
    });
}



app.get("/" , function(req,res) {

        let day = date.getDate(); 
        console.log("home");
        item_list = [];
    
        const query = 'SELECT items FROM todo_list';
    
        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            
            results.forEach(element => {
                console.log(element.items);
                item_list.push(element.items);
            });
            res.render("list" , {listTitle: day , newListItems : item_list});
        });
    
})

app.post("/" , function(req,res){

    let item = req.body.newItem;

    if(req.body.button == "work list"){

        const query = "INSERT INTO todo_list (items) VALUES (?)";

        connection.query(query,[item], (error, results, fields) => {
            if (error) throw error;
            console.log('Inserted Row ID:', results.insertId);
        });

        res.redirect("/work");
    }
    else{
        const query = "INSERT INTO todo_list (items) VALUES (?)";

        connection.query(query,[item], (error, results, fields) => {
            if (error) throw error;
            console.log('Inserted Row ID:', results.insertId);
        });

        res.redirect("/");    
    }
})

app.get("/work" , function(req,res){
    res.render("list" , {listTitle: "work list" , newListItems: workItems});
})

app.post("/work" , function(req,res){
    item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000 , function(){
    console.log("App started at 3000");
})
const mysql = require('mysql');

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',  // Your MySQL host
  user: 'root',       // Your MySQL username
  password: '',  // Your MySQL password
  database: 'todo-list'   // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

const query = 'SELECT items FROM todo_list';
connection.query(query, (error, results, fields) => {
    if (error) throw error;
    
    results.forEach(element => {
        console.log(element.items)
    });
 });




 connection.end((err) => {
    // The connection is terminated gracefully
    if (err) {
      console.log('Error ending the connection:', err);
    } else {
      console.log('Connection closed');
    }
  });




  console.log('Start');

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Data fetched');
      resolve('Data');
    }, 2000);
  });
}

async function processData() {
  const data = await fetchData();
  console.log(data);
}

processData();

console.log('End');

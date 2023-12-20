const http=require('http');
const express= require('express');
const app= express();
var cors = require('cors')
const mariadb=require('mariadb') ;
const dotenv= require('dotenv') ;
 
app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})
 
app.listen(8000, function () {
  console.log('CORS-enabled web server listening on port 80')
})


const { stringify } = require('querystring');
dotenv.config()

const PORT= process.env.PORT || '3000';

const pool= mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

  
const appWebPage = http.createServer((req,res)=>{
console.log('Hey');
})
//Middlewares

app.use(cors())

app.get('/ideas/', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })



//GET Routes

app.get("/", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection()
        const data = await connection.query(
            "SELECT * FROM brilliant_Minds.ideas;"
        )
        res.send(data)
    } catch (error) {
        throw error
    } finally {
        if (connection) connection.end()
    }
})

app.get("/ideas/:Idea_id", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.query(
            "SELECT * FROM ideas WHERE Idea_id = ?", [req.params.Idea_id]
        );
        if (result.length === 0) {
            // Handle the case where no idea with the given id was found
            return res.status(404).send("Idea not found");
        } 
        res.json(result);
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.end();
    }
})

//POST routes

app.post('/create', async (req,res)=>{
    let connection;
    try {
        connection = await pool.getConnection();
        const description = req.body.description;
        const dateCreated = new Date();
        const formattedDateCreated = dateCreated.toISOString();

        const data=  await connection.query
        ('INSERT INTO ideas (Description, Date_created) VALUES (?, ?);', [description, dateCreated]);
    
        const formattedData = {data,
            Date_created: formattedDateCreated, // Convert to ISO format
        };

        res.json(formattedData);
        return formattedData;
    } catch (error) {
        console.error('Error inserting data:', error);
    res.status(500).send('Internal Server Error');
    } finally {
        if (connection) connection.end();
    }
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))


//Listening
app.listen(PORT, 'localhost', (err)=>{
    
    if(err){
        console.log(err)
    }else {
        console.log(`Listening' ${PORT}`)
    }
})
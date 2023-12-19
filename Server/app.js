const http=require('http');
const express= require('express');
const app= express();
const mariadb=require('mariadb') ;
const dotenv= require('dotenv') ;
dotenv.config()

const PORT= process.env.PORT || '3000';

const pool= mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 6
});

  
const appWebPage = http.createServer((req,res)=>{
console.log('Hey');
})

//Routes

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


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))


//Listening
app.listen(PORT, 'localhost', ()=>{
    console.log(`Listening' ${PORT}`)
})
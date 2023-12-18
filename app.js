const http=require('http');
const PORT= process.env.PORT || '3000';
const express= require('express');
const app= express();
// const mariadb= require('mariadb');

// const pool= mariadb.createPool({
//     host: 'mydb.com',
//     user: 'mohd',
//     password: 'mohd99',
//     connectionLimit: 5
// });
// async function asyncFunction() {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       const rows = await conn.query("SELECT 1 as val");
//       console.log(rows); //[ {val: 1}, meta: ... ]
//       const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//       console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
//     } catch (err) {
//       throw err;
//     } finally {
//       if (conn) return conn.end();
//     }
//   }
  
const appWebPage = http.createServer((req,res)=>{
console.log('Hey')
})




//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))


//Listening
app.listen(PORT, 'localhost', ()=>{
    console.log(`Listening' ${PORT}`)
})
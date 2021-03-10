const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "alphasense",
  insecureAuth: true,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM alphasdata;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
app.get("/api/massages", (req, res) => {
  const sqlSelect = "SELECT user_massage  FROM alphasdata;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const userName = req.body.userName;
  const userMassage = req.body.userMassage;
  const sqlInsert =
    "INSERT INTO alphasdata (user_massage,user_author) VALUES (?,?)";
  db.query(sqlInsert, [userMassage, userName], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:id", (req, res)=>{
    const massage = req.params.id;
    console.log("here",massage)
    const sqlDelete = "DELETE FROM alphasdata WHERE id =?";
    db.query(sqlDelete, massage, (err, result)=>{
        if(err) console.log(err)
    })

})


app.listen(3001, () => {
  console.log("running on port 3001/");
});

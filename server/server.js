const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'mercuryAdmin',
    host: 'project-mercury.cuh3napsxadn.us-east-2.rds.amazonaws.com',
    password: 'cs348Project',
    database: 'Mercury'
});

app.post('/create', (req, res) => {
    console.log(req.body.userName)
    const Portfolio_Id = req.body.portfolioId
    const Account_Name = req.body.accountName
    const Username = req.body.userName
    const Pass = req.body.password
    const Credit_Score = req.body.creditScore
    const Asset_Total = req.body.assetTotal

    db.query(
        'INSERT INTO Portfolio (Portfolio_ID, Account_Name, Username, Pass, Credit_Score, Asset_Total) VALUES (?,?,?,?,?,?)',
        [Portfolio_Id, Account_Name, Username, Pass, Credit_Score, Asset_Total],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Yay, your server is running on port 3001")
})
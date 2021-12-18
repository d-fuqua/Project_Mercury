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

app.get('/portfolios', (req, res) => {
    db.query(
        'SELECT * FROM Portfolio',
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.get('/max_asset', (req, res) => {
    db.query(
        'call Mercury.GetAssetMax()',
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.post('/create-budget-goal', (req, res) => {
    const Objective = req.body.objective
    const Timeframe = req.body.timeframe
    const Projected_Expenses = req.body.projectedExpenses
    const Projected_Income = req.body.projectedIncome
    const Portfolio_Id = req.body.portfolioId

    db.query(
        'INSERT INTO Budget_Goals (Objective, Timeframe, Projected_Expenses, Projected_Income, Portfolio_ID) VALUES (?,?,?,?,?)',
        [Objective, Timeframe, Projected_Expenses, Projected_Income, Portfolio_Id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    );
});

app.get('/portfolio-budget-goal', (req, res) => {
    db.query(
        'SELECT bg.Portfolio_ID as PortID, p.Account_Name as AccName, bg.Objective as Obj, bg.Timeframe as Timeframe, p.Asset_Total as AstTot FROM Budget_Goals as bg LEFT OUTER JOIN Portfolio as p ON bg.Portfolio_ID=p.Portfolio_ID ORDER BY PortID',
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.get('/timeframe-averages', (req, res) => {
    db.query(
        'call Mercury.getBudgetAvgs()',
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.post('/create-transaction', (req, res) => {
    const TxNum = req.body.txNum
    const Account_Name = req.body.accountName
    const Amount = req.body.amount
    const Transaction_Type = req.body.transactionType
    const Vender = req.body.vender
    const Earnings = req.body.earning
    const Account_ID = req.body.accountId

    db.query(
        'INSERT INTO Transactions (TxNum, Account_Name, Amount, Transaction_Type, Vender, Earnings, Account_ID) VALUES (?,?,?,?,?,?,?)',
        [TxNum, Account_Name, Amount, Transaction_Type, Vender, Earnings, Account_ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    );
});

app.get('/total-earnings', (req, res) => {
    db.query(
        'call Mercury.getAccountTotal()',
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Your server is running on port 3001")
})
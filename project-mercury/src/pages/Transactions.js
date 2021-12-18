import React, { useState } from 'react';
import './PageStyle.css';
import Axios from 'axios';

function Transactions() {

    const [txNum, setTxNum] = useState(0);
    const [accountName, setAccountName] = useState("");
    const [amount, setAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("");
    const [vender, setVender] = useState("");
    const [earning, setEarnings] = useState(0);
    const [accountId, setAccountId] = useState(0);

    const [totalList, setTotalList] = useState([]);

    const addTransaction = () => {
        Axios.post('http://localhost:3001/create-transaction', {
            txNum: txNum,
            accountName: accountName,
            amount: amount,
            transactionType: transactionType,
            vender: vender,
            earning: earning,
            accountId: accountId
        }).then(() => {
            console.log("Success");
        })
    };

    const getTotalEarnings = () => {
        Axios.get('http://localhost:3001/total-earnings', {
        }).then((response) => {
            console.log(response);
            setTotalList(response.data[0]);
        })
    };

    return (
        <div className='Page'>
            <h2>Insert New Transaction</h2>
            <label>Transaction Number: </label>
            <input type='number' onChange={(event) => { setTxNum(event.target.value) }} />
            <label>Account Name: </label>
            <input type='text' onChange={(event) => { setAccountName(event.target.value) }} />
            <label>Amount: </label>
            <input type='number' onChange={(event) => { setAmount(event.target.value) }} />
            <label>Transaction_Type: </label>
            <input type='text' onChange={(event) => { setTransactionType(event.target.value) }} />
            <label>Vender: </label>
            <input type='text' onChange={(event) => { setVender(event.target.value) }} />
            <label>Earnings: </label>
            <input type='number' onChange={(event) => { setEarnings(event.target.value) }} />
            <label>Account ID: </label>
            <input type='number' onChange={(event) => { setAccountId(event.target.value) }} />
            <button onClick={addTransaction}>Add Transaction Info</button>

            <div className='Portfolios'>
                <button onClick={getTotalEarnings}>Show Avg Income and Expenses per Timeframe</button>

                {totalList.map((val, key) => {
                    return (
                        <div>
                            <h2>Account Name: {val.Account_Name}</h2>
                            <ul>
                                <li>Total Earnings: {val.TotalEarnings}</li>
                            </ul>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default Transactions

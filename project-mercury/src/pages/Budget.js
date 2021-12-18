import React, { useState } from 'react';
import './PageStyle.css';
import Axios from 'axios';

function Budget() {

    const [objective, setObjective] = useState("");
    const [timeframe, setTimeframe] = useState("");
    const [projectedExpenses, setProjectedExpenses] = useState(0);
    const [projectedIncome, setProjectedIncome] = useState(0);
    const [portfolioId, setPortfolioId] = useState(0);

    const [budgetPortfolioList, setBudgetPortfolioList] = useState([]);
    const [averagesList, setAveragesList] = useState([]);

    const addBudgetGoal = () => {
        Axios.post('http://localhost:3001/create-budget-goal', {
            objective: objective,
            timeframe: timeframe,
            projectedExpenses: projectedExpenses,
            projectedIncome: projectedIncome,
            portfolioId: portfolioId
        }).then(() => {
            console.log("Success");
        })
    };

    const getPortfolioBudgetGoals = () => {
        Axios.get('http://localhost:3001/portfolio-budget-goal', {
        }).then((response) => {
            console.log(response);
            setBudgetPortfolioList(response.data);
        })
    };

    const getTimeframeAverages = () => {
        Axios.get('http://localhost:3001/timeframe-averages', {
        }).then((response) => {
            console.log(response);
            setAveragesList(response.data[0]);
        })
    };

    return (
        <div className='Page'>
            <h2>Insert New Budget Goal</h2>
            <label>Objective: </label>
            <input type='text' onChange={(event) => { setObjective(event.target.value) }} />
            <label>Timeframe: </label>
            <input type='text' onChange={(event) => { setTimeframe(event.target.value) }} />
            <label>Projected Expenses: </label>
            <input type='number' onChange={(event) => { setProjectedExpenses(event.target.value) }} />
            <label>Projected Income: </label>
            <input type='number' onChange={(event) => { setProjectedIncome(event.target.value) }} />
            <label>Portfolio ID: </label>
            <input type='number' onChange={(event) => { setPortfolioId(event.target.value) }} />
            <button onClick={addBudgetGoal}>Add Portfolio Info</button>

            <div className='Portfolios'>
                <button onClick={getPortfolioBudgetGoals}>Show Budget Goals with Portfolio Info</button>

                {budgetPortfolioList.map((val, key) => {
                    return (
                        <div>
                            <h2>Portfolio_Id: {val.PortID}</h2>
                            <ul>
                                <li>Account_Name: {val.AccName}</li>
                                <li>Objective: {val.Obj}</li>
                                <li>Timeframe: {val.Timeframe}</li>
                                <li>Asset_Total: {val.AstTot}</li>
                            </ul>
                        </div>
                    );
                })}
            </div>

            <div className='Portfolios'>
                <button onClick={getTimeframeAverages}>Show Avg Income and Expenses per Timeframe</button>

                {averagesList.map((val, key) => {
                    return (
                        <div>
                            <h2>Timeframe: {val.Timeframe}</h2>
                            <ul>
                                <li>Average Projected Expenses: {val.avgExpenses}</li>
                                <li>Average Projected Income: {val.avgIncome}</li>
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Budget

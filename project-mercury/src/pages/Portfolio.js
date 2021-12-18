import React, { useState } from 'react';
import Axios from 'axios';

function Portfolio() {

    const [portfolioId, setPortfolioId] = useState(0);
    const [accountName, setAccountName] = useState("accountName");
    const [username, setUsername] = useState("username");
    const [password, setPassword] = useState("password");
    const [creditScore, setCreditScore] = useState(0);
    const [assetTotal, setAssetTotal] = useState(0);

    const [portfolioList, setPortfolioList] = useState([]);
    const [maxAsset, setMaxAsset] = useState([]);

    const addPortfolio = () => {
        Axios.post('http://localhost:3001/create', {
            portfolioId: portfolioId,
            accountName: accountName,
            userName: username,
            password: password,
            creditScore: creditScore,
            assetTotal: assetTotal
        }).then(() => {
            console.log("Success");
        })
    };

    const getPortfolios = () => {
        Axios.get('http://localhost:3001/portfolios', {
        }).then((response) => {
            console.log(response);
            setPortfolioList(response.data);
        })
    };

    const getAssetMax = () => {
        Axios.get('http://localhost:3001/max_asset', {
        }).then((response1) => {
            console.log(response1);
            setMaxAsset(response1.data[0]);
        })
    };

    return (
        <div className='Page'>
            <h2>Insert New Portfolio</h2>
            <label>Portfolio ID: </label>
            <input type='number' onChange={(event) => { setPortfolioId(event.target.value) }} />
            <label>Account Name: </label>
            <input type='text' onChange={(event) => { setAccountName(event.target.value) }} />
            <label>Username: </label>
            <input type='text' onChange={(event) => { setUsername(event.target.value) }} />
            <label>Password: </label>
            <input type='text' onChange={(event) => { setPassword(event.target.value) }} />
            <label>Credit Score: </label>
            <input type='number' onChange={(event) => { setCreditScore(event.target.value) }} />
            <label>Asset Total: </label>
            <input type='number' onChange={(event) => { setAssetTotal(event.target.value) }} />
            <button onClick={addPortfolio}>Add Portfolio Info</button>

            <div className='Portfolios'>
                <button onClick={getPortfolios}>Show all Portfolios</button>

                {portfolioList.map((val, key) => {
                    return (
                        <ul>
                            <li>Portfolio_Id: {val.Portfolio_ID}</li>
                            <li>Account_Name: {val.Account_Name}</li>
                            <li>Username: {val.Username}</li>
                            <li>Password: {val.Pass}</li>
                            <li>Credit Score: {val.Credit_Score}</li>
                            <li>Asset_Total: {val.Asset_Total}</li>
                        </ul>
                    );
                })}
            </div>

            <div className='Button'>
                <button onClick={getAssetMax}>Get max Total_Asset</button>

                {maxAsset.map((val, key) => {
                    return (
                        <div>
                            <ul>
                                <li>Portfolio_Id: {val.Portfolio_Id}</li>
                                <li>Account_Name: {val.Account_Name}</li>
                                <li>Asset_Total: {val.Asset_Total}</li>
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Portfolio

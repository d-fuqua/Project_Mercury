import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Budget from "./pages/Budget";
import Porfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import Investments from "./pages/Investments";
import RegularExpenses from "./pages/RegularExpenses";
import Income from "./pages/Income";
import Loans from "./pages/Loans";

function App() {
  return (
    <Router className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<Porfolio />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/regular_expenses" element={<RegularExpenses />} />
        <Route path="/budgets" element={<Budget />} />
        <Route path="/income" element={<Income />} />
        <Route path="/loans" element={<Loans />} />
      </Routes>
    </Router>
  );
}

export default App;